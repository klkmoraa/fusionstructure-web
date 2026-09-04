# Migration record · FusionStructure Web

- Source: `https://github.com/klkmoraa/FusionStructure`
- Cutover tag: `monolith-cutover-20260904`
- Cutover commit: `700a0365352245a1db61f6938fd1bcd72f812fa7`
- Extraction: `git-filter-repo 2.47.0`, path allowlist
- Current product: portal/landing/brandbook/assets only
- Status: experimental; not certified structural software

The root application is intentionally small. Tool actions navigate to sibling
product URLs, so Web has no dependency on 2D/3D models, engines, workers, or
stores. The nested `brandbook-site/` and `motion/` trees retain their source
history as production workspaces and can be promoted to dedicated pipelines
when their deployment contracts are finalized.
