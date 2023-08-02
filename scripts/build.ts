#!/usr/bin/env ts-node
import childProcess from 'child_process';
import {promisify} from 'util';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {z} from 'zod';

export const EnvSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).optional().default('production'),
	PATH: z.string(),
});

const ArgvSchema = z.object({
  verbose: z.boolean().optional().default(false),
});

type Argv = z.infer<typeof ArgvSchema>;

const ENV = EnvSchema.parse(process.env);

const exec = promisify(childProcess.exec);
const log = console.log;

async function build({verbose}: Argv) {
  const command = 'lerna run build';
  if (verbose) {
		log(`Command "${command}" is running.`);
	}
	return exec(command, {env: ENV});
}

async function handler(args = {}) {
  const argv = ArgvSchema.parse(args);
	log(`Build has started.`);
	await build(argv);
	log(`Build has finished.`);
}

yargs(hideBin(process.argv))
	.command({
		command: '$0',
    handler,
		builder: (command) => command
				.option('verbose', {type: 'boolean'}),
	})
	.help()
	.strict(true)
	.version(false)
	.parse();
