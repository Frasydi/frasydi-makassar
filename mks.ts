#!/usr/bin/env node

import * as fs from 'fs';
import * as process from 'process';
import rules from './rules';

// Define a transpiler rule



// CLI entrypoint
function main() {
  const [, , file] = process.argv;
  if (!file) {
    console.error('Usage: mks <script.mks>');
    process.exit(1);
  }

  // Read source
  let src: string;
  try {
    src = fs.readFileSync(file, 'utf-8');
  } catch (err) {
    console.error(`Cannot read file: ${file}`);
    process.exit(1);
  }

  const lines = src.split(/\r?\n/);
  const jsLines: string[] = [];
  let indent = '';

  // Transpile each line
  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line) return;

    let matched = false;
    for (const rule of rules) {
      const m = line.match(rule.regex);
      if (m) {
        const code = rule.transform(m);
        jsLines.push(indent + code);
        matched = true;

        // Manage indent for block start/end
        if (code.trim().endsWith('{')) {
          indent += '  ';  // increase indent
        } else if (code.trim() === '}') {
          indent = indent.slice(0, -2);  // decrease indent
        }
        break;
      }
    }

    if (!matched) {
      console.error(`Syntax error on line ${idx + 1}: \\"${line}\\"`);
      process.exit(1);
    }
  });

  // Close any remaining blocks
  while (indent.length > 0) {
    indent = indent.slice(0, -2);
    jsLines.push(indent + '}');
  }

  // Combine and execute
  const jsCode = jsLines.join('\n');
  try {
    new Function(jsCode)();
  } catch (err) {
    console.error('Runtime error:', err);
    process.exit(1);
  }
}

main();
