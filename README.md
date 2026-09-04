# FusionStructure Web

Portal y marca del ecosistema FusionStructure. El portal contiene catálogo,
landing, brandbook y tooling visual; los productos 2D y 3D se abren por enlaces
de aplicación y no se importan dentro de esta build.

## Publicación

El portal se publica en https://klkmoraa.github.io/fusionstructure-web/ y el
botón **Solver 2D** abre la aplicación independiente en
https://klkmoraa.github.io/fstructure/.

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

## Foundation local y flujo rápido

`src/foundation/productLinks.ts` es propiedad exclusiva de Web. Expone
`PRODUCT_IDS` y `PRODUCT_LINKS` para identificar productos y abrir sus URLs
públicas; no incorpora unidades, álgebra lineal ni implementaciones de 2D/3D.

Para el trabajo diario sobre esta capa, ejecutar sus pruebas focalizadas y la
puerta de límite antes de cambiar una URL:

```text
npm run test -- src/foundation/productLinks.test.ts src/foundation/localFoundationBoundary.test.ts
npm run check:local-foundation
```

Para una liberación, ejecutar `npm run check` y abrir un PR sólo para Web. La
puerta revisa los TS/TSX de producción y `package.json`: bloquea el Foundation
archivado y dependencias o internos de productos hermanos, mientras que los
fixtures de pruebas quedan fuera del escaneo.
