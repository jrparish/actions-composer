/* eslint-disable import/no-dynamic-require, @typescript-eslint/no-var-requires */
import * as path from 'path';
import * as fs from 'fs';
import * as ts from 'typescript';

import { Composer } from './composer';

const [, , inputDir = '.github/composer'] = process.argv;

const config = {
  entry: './index.ts'
};

const projectDir = path.resolve(inputDir);
const buildDir = path.resolve(`${inputDir}.tmp`);

const entryPath = path.resolve(projectDir, config.entry);

const program = ts.createProgram([entryPath], {
  module: ts.ModuleKind.CommonJS,
  outDir: buildDir
});
const emitResult = program.emit();

ts.getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics)
  .forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start
      );
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
  });

const composer = require(path.resolve(buildDir, 'index.js')).default as Composer;

fs.rmSync(buildDir, { recursive: true });

composer.build();
