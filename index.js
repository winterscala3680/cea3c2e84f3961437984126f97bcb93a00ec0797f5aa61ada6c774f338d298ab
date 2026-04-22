#!/usr/bin/env node
/**
 * CLI tool entry point
 * Project ID: a037b6
 */

'use strict';

const { parseArgs } = require('util');

const COMMANDS_a037b6 = {
  run: cmdRun_a037b6,
  list: cmdList_a037b6,
  version: cmdVersion_a037b6,
};

function cmdRun_a037b6(positionals, opts) {
  const task = positionals[0] || 'default';
  const output = opts.output || './output';
  console.log(`Running task: ${task}`);
  console.log(`Output: ${output}`);
  console.log(`Instance: a037b6`);
}

function cmdList_a037b6(positionals, opts) {
  const filter = opts.filter || '';
  const items = ['task-a', 'task-b', 'task-c'].filter(
    (t) => !filter || t.includes(filter)
  );
  console.log('Available tasks:');
  items.forEach((item) => console.log(`  - ${item}`));
}

function cmdVersion_a037b6() {
  const pkg = require('./package.json');
  console.log(`${pkg.name} v${pkg.version} (id: a037b6)`);
}

function printHelp_a037b6() {
  console.log(`Usage: tool <command> [options]

Commands:
  run <task>     Run a task
  list           List available tasks
  version        Show version info

Options:
  --output, -o   Output directory (default: ./output)
  --filter, -f   Filter pattern for list command
  --help, -h     Show this help
`);
}

function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      output: { type: 'string', short: 'o' },
      filter: { type: 'string', short: 'f' },
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
    strict: false,
  });

  if (values.help || positionals.length === 0) {
    printHelp_a037b6();
    process.exit(0);
  }

  const [cmd, ...rest] = positionals;
  const handler = COMMANDS_a037b6[cmd];
  if (!handler) {
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
  }
  handler(rest, values);
}

main();
