# FusionStructure Web

Portal y marca del ecosistema FusionStructure. El portal contiene catálogo,
landing, brandbook y tooling visual; los productos 2D y 3D se abren por enlaces
de aplicación y no se importan dentro de esta build.

## Estado

`Experimental`: los estados Disponible, Experimental y Planeado del catálogo
son explícitos. El portal no constituye software certificado para obra.

## Desarrollo

```text
npm ci
npm run check
npm run dev
```

La procedencia, el tag de corte y el alcance filtrado están en
[MIGRATION.md](MIGRATION.md). `brandbook-site/` y `motion/` permanecen como
workspaces de producción visual; la puerta raíz no los importa como solvers.
