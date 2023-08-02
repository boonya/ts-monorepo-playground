#!/usr/bin/env ts-node
import {log, getErrorMessage, getWorkspaces, getOutDir} from './common';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {z} from 'zod';
import fs from 'fs/promises';
import path from 'path'

const ArgvSchema = z.object({
  verbose: z.boolean().optional().default(false),
});

type Argv = z.infer<typeof ArgvSchema>;

async function copy(outDir: string, workspace: string) {
  const workspaceOutDir = await getOutDir(workspace);
  const promises = ['README.md', 'package.json'].map(async (name) => {
    const target = path.resolve(workspace, name);
    const dest = path.resolve(workspaceOutDir, name);
    fs.copyFile(target, dest);
  });
  await Promise.all(promises);

  const dir = workspace.split('/').pop()
  console.log('fs.cp', `${workspace}/build`, `${outDir}/${dir}`);
  await fs.cp(`${workspace}/build`, `${outDir}/${dir}`, {recursive: true});
}

async function move(argv: Argv) {
  const outDir = await getOutDir('.');
  const workspaces = await getWorkspaces();
  const promises = workspaces.map((v) => copy(outDir, v));
  const result = await Promise.all(promises);
  log('result: ', result);
}

async function handler(args = {}) {
  try {
    const argv = ArgvSchema.parse(args);
    log(`Started.`);
    await move(argv);
    log(`Finished.`);
  } catch (err) {
    log(getErrorMessage(err));
  }
}

yargs(hideBin(process.argv))
  .command({
    command: '$0',
    handler,
    builder: (command) => command
        .option('verbose', {type: 'boolean'})
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
