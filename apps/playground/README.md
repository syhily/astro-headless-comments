# Astro Headless Comments: Playground

This is an demo project in testing the `astro-headless-comments` plugin.

## Start a local LibSQL

The LibSQL is required to run this example locally. Use docker to start a libsql instance.

```bash
# Running on most platform
docker run --name astro-headless-comments-db -d -p 1234:8080 -ti \
    -e SQLD_HTTP_AUTH=basic:dGVzdDoxMjM0NTY= \
    -e SQLD_NODE=primary \
    ghcr.io/tursodatabase/libsql-server:latest

# Running on Apple Silicon
docker run --name astro-headless-comments-db -d -p 1234:8080 -ti \
    -e SQLD_HTTP_AUTH=basic:dGVzdDoxMjM0NTY= \
    -e SQLD_NODE=primary \
    --platform linux/amd64 \
    ghcr.io/tursodatabase/libsql-server:latest
```

## Configure the Environment

This sample project use `dotenv` for loading all the required environment variables.
You can rename the `.env.example` to `.env` and edit it for adding the environments for local testing.

If you follow the command shown above to have a local running LibSQL instance.
The `LIBSQL_DATABASE_URL` should be `http://localhost:1234` and the `LIBSQL_AUTH_TOKEN` should be `dGVzdDoxMjM0NTY=`.
