import { describe, expect, it } from 'vitest';
import { PRODUCT_LINKS } from './productLinks';

describe('PRODUCT_LINKS', () => {
  it('opens the standalone Solver 2D GitHub Pages deployment', () => {
    expect(PRODUCT_LINKS.fstructure).toBe('https://klkmoraa.github.io/fstructure/');
  });
});
