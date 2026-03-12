
# Blueprint: Sincronización de Partidos en Segundo Plano

## Visión General

Este plan detalla la implementación de un sistema de sincronización en segundo plano para precargar partidos desde una API externa (Sofascore) en nuestra base de datos. Esto resolverá el error de "constraint violation" que ocurre al intentar realizar una apuesta en un partido que aún no existe en la base de datos local.

## Plan de Implementación Actual

### Paso 1: Crear un Endpoint de Sincronización

- Crear una nueva ruta de API en `src/app/api/matches/sync/route.ts`.
- Este endpoint será responsable de obtener los datos de los partidos y sincronizarlos con la base de datos.

### Paso 2: Implementar la Lógica de Sincronización

- Dentro del nuevo endpoint, obtener la lista de partidos populares desde el endpoint existente de Sofascore (`/api/sofascore/trending`).
- Para cada partido obtenido, utilizar la operación `upsert` de Prisma para insertarlo en la tabla `Match` si no existe, o actualizarlo si ya existe. Esto asegura que no haya duplicados y que los datos se mantengan consistentes.
- Se mapearán los datos de la API de Sofascore a la estructura del modelo `Match` de Prisma.

### Paso 3: Explicar el Uso

- Se proporcionará una explicación de cómo este endpoint puede ser utilizado en un entorno de desarrollo para simular la sincronización y cómo se configuraría en producción utilizando un "cron job".

