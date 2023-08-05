# [WIP !!!] Monorepo release test

## Prepare Release

If you create a branch called `release/*` with `main` branch as a target it will automatically trigger [release workflow](.github/workflows/release.yml).

```mermaid
flowchart LR

A(Lint) --> D
B(Type Check) --> D
C(Test) --> D(Checkout git branch)
D --> E(Setup NodeJs)
E --> F(Install dependencies)
F --> G(Bump versions)
F --> H(Create changelogs)
H --> I(Commit & Push)
```

## Pre-Release

???

## Canary Release

????

## How it's built

Once you merge anything into the `main` branch or directly push into it, [the "publish" workflow](/.github/workflows/publish.yml) should trigger ["test" workflow](/.github/workflows/publish.yml) and if it is finished successfully, build and publish appropriate packages.

## Auxillary commands

Get the visualization of the graph. You can interactively explore what your workspace looks like and the relationships between the packages.

```sh
npx nx graph
```

[Read more here](https://nx.dev/core-features/explore-graph)
