#!/usr/bin/env ts-node
import {log, exec, getErrorMessage} from './common';
import childProcess from 'child_process';
import {promisify} from 'util';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {ZodError, z} from 'zod';
import fs from 'fs/promises';
import {glob} from 'glob';
/**
 * https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
 * https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#json-modules
 */
// @ts-ignore
import pkg from '../package.json' assert { type: 'json' };

const ArgvSchema = z.object({
  verbose: z.boolean().optional().default(false),
  scope: z.string().optional(),
});

type Argv = z.infer<typeof ArgvSchema>;

function prepareErrorMessage(err: unknown): string {
  if (!(err instanceof Error)) {
    return 'Something went wrong.';
  }
  if (err instanceof ZodError) {
    return `${err.name}: ${err.message}`;
  }
  return err.message;
}

async function getScopePackageMap(workspaces: string[]) {
  const entries = await Promise.all(workspaces
    .map((workspace) => [workspace.split('/').pop() as string, workspace])
    .map(async ([scope, workspace]) => {
      const json = await fs.readFile(`${workspace}/package.json`, {encoding: 'utf8'});
      return [scope, JSON.parse(json).name as string] as const;
    }));
  return new Map(entries);
}

async function main() {
  const workspaces = await glob(pkg.workspaces);
  const scopePackageMap = await getScopePackageMap(workspaces);
  const scopes = [...scopePackageMap.keys()];

  async function build({verbose, scope}: Argv) {
    const name = scope && scopePackageMap.get(scope);
    const command = [
      'lerna run build',
      name && `--scope ${name}`,
    ].filter(Boolean).join(' ');

    if (verbose) {
      log(`Command "${command}" is running.`);
    }

    return exec(command);
  }

  async function handler(args = {}) {
    try {
      const argv = ArgvSchema.parse(args);
      log(`Build has started.`);
      await build(argv);
      log(`Build has finished.`);
    } catch (err) {
      log(prepareErrorMessage(err));
    }
  }

  yargs(hideBin(process.argv))
    .command({
      command: '$0',
      handler,
      builder: (command) => command
          .option('verbose', {type: 'boolean'})
          .option('scope', {choices: scopes})
    })
    .help()
    .strict(true)
    .version(false)
    .parse();
}

main();
