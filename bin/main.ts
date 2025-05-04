#!/usr/bin/env node
import readline from "readline";
import { ProcessCommand } from "../src/CommandProcessor.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commandProcessor = new ProcessCommand();

function displayMenu() {
  console.log("\nMAIN MENU:");
  console.log("1: Register a user");
  console.log("2: Show Users");
  console.log("exit: Quit the application");

  rl.question("\nEnter command: ", (cmd) => {
    commandProcessor.handle(cmd, displayMenu, rl);
  });
}

console.log("Welcome to the Wallet CLI");
displayMenu();
