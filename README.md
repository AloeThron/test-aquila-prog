# Turborepo Docker starter

This is an official Docker starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This turborepo uses [pnpm] as a package manager.

### Docker

This repo is configured to be built with Docker, and Docker compose. To build database in this repo:

```
# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000 for Front-end project

Open https://localhost:3500/chest24?number=7456 for Back-end project

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [@repo/web]: a [Next.js] app
- [@repo/api]: an [Express] server
- [@repo/typescript-config]: tsconfig.json's used throughout the monorepo
- [eslint] configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- [Husky]: Automatically lint your commit messages, code, and run tests upon committing or pushing.
- [TypeScript] for static type checking
- [ESLint] for code linting
- [Prettier]for code formatting
  "# test-aquila-prog"
