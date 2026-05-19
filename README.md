# tsoa duplicate model repro

This repository contains minimal fixtures for TSOA duplicate model definition failures during metadata generation.

It intentionally does not use any private application code. The fixtures cover:

- A pnpm/workspace-style path duplication where the same logical file is reached through two filesystem paths.
- A built client package `.d.ts` type and a source contract type that describe the same schema but produce the same model name.
- An `@tsoaModel` canonical declaration that should win when another declaration with the same model name is present.

## Contributing notes for TSOA

TSOA's contributing guide says to:

1. Search for an existing issue before filing or working on a bug.
2. Discuss the bugfix or feature in an issue before writing too much code.
3. Link the PR to the bug being fixed and comment on the issue to avoid duplicated effort.
4. Keep the branch based on a reasonably recent `master` commit with a linear commit history.
5. Include adequate tests; at least one test should fail without the code change, with reasonable permutations and baseline changes where applicable.
6. Use clear commit messages.
7. Set `autocrlf = input` and `whitespace = cr-at-eol` to avoid line-ending problems.

Source: <https://github.com/lukeautry/tsoa/blob/master/docs/CONTRIBUTING.md>

## Install

Use Node 22 and pnpm 10:

```sh
corepack enable
pnpm --version
node --version
```

```sh
pnpm install
pnpm build
```

The default `package.json` uses `@tsoa/cli@7.0.0-alpha.0` and `@tsoa/runtime@7.0.0-alpha.0`.
`pnpm build` regenerates the client package declaration file consumed by the TSOA controller.

## Reproduce stock failures

Run TSOA's built-in `spec` command against the default config:

```sh
pnpm build
pnpm exec tsoa spec
```

With stock `@tsoa/cli@7.0.0-alpha.0`, generation fails with a duplicate model definition error.

To isolate each fixture, run the same TSOA command with a narrower config:

```sh
pnpm build
pnpm exec tsoa spec --configuration tsoa.path-identity.json
pnpm exec tsoa spec --configuration tsoa.client-declaration.json
pnpm exec tsoa spec --configuration tsoa.tsoa-model.json
```

Expected stock failures:

- `SharedPrompt`: same logical source file reached through `original.ts` and a symlinked `injected.ts`.
- `WorkflowMode`: source contract type collides with a built client package `.d.ts` type.
- `ULID`: duplicate declarations where one declaration is marked with `@tsoaModel`.

Relationship to upstream issues:

- [#1650](https://github.com/lukeautry/tsoa/issues/1650): covered by the `ULID` fixture. That issue is specifically about `@tsoaModel` no longer selecting the intended canonical declaration when two declarations share the same model name.
- [#1853](https://github.com/lukeautry/tsoa/issues/1853): covered by the `SharedPrompt` fixture. That issue is specifically about `CheckModelUnicity` comparing raw filesystem paths when the same logical file is reachable through different pnpm workspace paths.
- The `WorkflowMode` fixture is additional coverage for the same `CheckModelUnicity` failure area. It is not the exact scenario from #1650 or #1853; it covers an equivalent source contract model colliding with a built client package declaration model.

## Verify a TSOA PR build

Check out the TSOA PR branch locally, then pack the changed packages:

```sh
git clone https://github.com/lukeautry/tsoa.git
cd tsoa
gh pr checkout <pr-number>
yarn install --frozen-lockfile
yarn build
mkdir -p /tmp/tsoa-pr-packages
yarn workspace @tsoa/cli pack --filename /tmp/tsoa-pr-packages/tsoa-cli.tgz
yarn workspace @tsoa/runtime pack --filename /tmp/tsoa-pr-packages/tsoa-runtime.tgz
```

Install those packed PR packages into this repro:

```sh
cd /path/to/tsoa-duplicate-model-repro
pnpm clean
pnpm install --frozen-lockfile
pnpm add -D @tsoa/cli@file:/tmp/tsoa-pr-packages/tsoa-cli.tgz
pnpm add @tsoa/runtime@file:/tmp/tsoa-pr-packages/tsoa-runtime.tgz
pnpm build
pnpm exec tsoa spec
```

With the fixed TSOA build, generation should complete and write `generated/swagger.json`.

## License

MIT
