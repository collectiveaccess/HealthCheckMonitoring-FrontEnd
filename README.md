# HealthCheckMonitoring-FrontEnd

App that displays the healthcheck status of CollectiveAccess projects. Built using Next.js

## Get started

1. Install libraries

```bash
npm install
```

2. Setup envars

   1. Copy `env.sample`, and create `.env.local` for development and `.env` for production.

   2. Fill in the the envars

      - `DB_PATH` - path to the sqlite database used by [HealthCheckMonitoring](https://github.com/collectiveaccess/HealthCheckMonitoring)

      - `NEXT_PUBLIC_PER_PAGE` - number of statuses to show on project deatails page.

      - `NEXT_PUBLIC_PER_PAGE` - number of statuses to show on the project details page

      - `NEXT_PUBLIC_UPDATE_FREQUENCY_MINUTES` - how frequently to refetch project statuses

3. Start app

```bash
npm run dev
```
