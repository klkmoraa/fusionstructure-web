import { afterEach, describe, expect, it } from 'vitest';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const gatePath = fileURLToPath(new URL('../../scripts/check-local-foundation.mjs', import.meta.url));
const fixtureRoots: string[] = [];

const createFixture = (dependencies: Record<string, string> = {}): string => {
  const root = mkdtempSync(join(tmpdir(), 'fusionstructure-local-foundation-'));
  fixtureRoots.push(root);
  mkdirSync(join(root, 'src'), { recursive: true });
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({ name: 'fixture-web', dependencies }, null, 2),
  );
  return root;
};

const writeSource = (root: string, relativePath: string, source: string): void => {
  const target = join(root, 'src', relativePath);
  mkdirSync(join(target, '..'), { recursive: true });
  writeFileSync(target, source);
};

const runGate = (root: string) => {
  const result = spawnSync(process.execPath, [gatePath, '--root', root], {
    encoding: 'utf8',
  });
  return {
    status: result.status ?? 1,
    output: `${result.stdout ?? ''}${result.stderr ?? ''}`,
  };
};

afterEach(() => {
  for (const root of fixtureRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe('local Foundation boundary gate', () => {
  it('allows local Foundation imports and ignores test-only fixture strings', () => {
    const root = createFixture();
    writeSource(root, 'App.tsx', "import { PRODUCT_LINKS } from './foundation/productLinks';\nvoid PRODUCT_LINKS;");
    writeSource(root, 'foundation/localFoundationBoundary.test.ts', "import '@fusionstructure/foundation';");

    expect(runGate(root).status).toBe(0);
  });

  it.each(['bridge.ts', 'bridge.tsx'])('rejects archived Foundation imports in production %s', (fileName) => {
    const root = createFixture();
    writeSource(root, fileName, "import '@fusionstructure/foundation';");

    const result = runGate(root);

    expect(result.status).toBe(1);
    expect(result.output).toContain(`src/${fileName}`);
    expect(result.output).toContain('archived Foundation');
  });

  it('rejects archived Foundation values used by computed production imports', () => {
    const root = createFixture();
    writeSource(root, 'bridge.ts', "const archived = '@fusionstructure/foundation';\nvoid import(archived);");

    const result = runGate(root);

    expect(result.status).toBe(1);
    expect(result.output).toContain('src/bridge.ts');
    expect(result.output).toContain('archived Foundation');
  });

  it('rejects sibling-product package dependencies', () => {
    const root = createFixture({ '@fusionstructure/space3d': '1.0.0' });
    writeSource(root, 'App.tsx', 'export {};');

    const result = runGate(root);

    expect(result.status).toBe(1);
    expect(result.output).toContain('package.json');
    expect(result.output).toContain('sibling product dependency');
  });
});
