#!/usr/bin/env node

const { createCLI } = require('../dist/main');

const program = createCLI();
program.parse();