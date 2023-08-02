import childProcess from 'child_process';
import {promisify} from 'util';
import {ZodError, z} from 'zod';
import {glob} from 'glob';
import path from 'path'

const EnvSchema = z.object({
	NODE_ENV: z.enum(['development', 'production']).optional().default('production'),
	PATH: z.string(),
});
const env = EnvSchema.parse(process.env);

export const exec = (cmd: string) => promisify(childProcess.exec)(cmd, {env: env});

export const log = console.log;

export function getErrorMessage(err: unknown): string {
  if (!(err instanceof Error)) {
    return 'Something went wrong.';
  }
  if (err instanceof ZodError) {
    return `${err.name}: ${err.message}`;
  }
  return err.message;
}

const RecordShape = z.record(z.string(), z.string());
const PkgSchema = z.object({
  name: z.string(),
  workspaces: z.array(z.string()),
  scripts: RecordShape,
  dependencies: RecordShape.optional(),
  devDependencies: RecordShape.optional(),
  peerDependencies: RecordShape.optional(),
});

export async function readPackage(file: string) {
  /**
   * https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
   * https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#json-modules
   */
  const pkg = await import(file, {assert: { type: 'json' }});
  return PkgSchema.parse(pkg.default);
}

export async function getWorkspaces() {
  const pkg = await readPackage('../package.json');
  return glob(pkg.workspaces);
}

const TsConfigShape = z.object({
  compilerOptions: z.object({
    outDir: z.string(),
  }),
});

export async function readTsConfig(file: string) {
  /**
   * https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
   * https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#json-modules
   */
  const pkg = await import(file, {assert: { type: 'json' }});
  return TsConfigShape.parse(pkg.default);
}

export async function getOutDir(basePath: string) {
  const file = path.resolve(basePath, 'tsconfig.json');
  const {outDir} = (await readTsConfig(file)).compilerOptions
  return path.resolve(basePath, outDir);
}
