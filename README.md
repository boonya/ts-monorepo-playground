# Monorepo release test

## How it's done

Once you merge anything into the `main` branch or directly push into it, [the "publish" workflow](/.github/workflows/publish.yml) should trigger ["test" workflow](/.github/workflows/publish.yml) and if it is finished successfully, build and publish packages.
