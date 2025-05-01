#!/usr/bin/env node
import { greet } from '../src/greeter.js';

const [, , nameArg] = process.argv;
greet(nameArg || 'stranger');