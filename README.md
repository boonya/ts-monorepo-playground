# Monorepo release test

## Available scripts

- `npm run typecheck`
- `npm run build`
- `npm run release`

## How it's done

Once you merge anything into the `main` branch or directly push into it, [the "publish" workflow](/.github/workflows/publish.yml) should trigger `typecheck`, `build` and then `release` scripts.
