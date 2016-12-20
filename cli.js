#!/usr/bin/env node

const index = require('./index')

const args = require('yargs')
  .usage('Usage: $0 <source> <target>')
  .demand(2)
  .option('m')
  .describe('m', 'A pattern to match when scanning keys')
  .alias('m', 'match')
  .option('c')
  .describe('c', 'Approximate number of keys for redis to return per iteration')
  .alias('c', 'count')
  .number('c')
  .help()
  .argv

index(args._[0], args._[1], args)
