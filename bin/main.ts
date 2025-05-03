#!/usr/bin/env node
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log("\nMAIN MENU:");
  console.log("1: Register a user");
  console.log("2: Top up money");
  console.log("3: Transfer money");
  console.log("4: Check balance");
  console.log("5: Login as different user");
  console.log("exit: Quit the application");

  // Prompt for next command
  rl.question("\nEnter command: ", processCommand);
}

// Process the user's command
function processCommand(command: string) {
  switch (command.toLowerCase()) {
    case "1":
      console.log("Registered User");
      displayMenu();
      break;
    case "exit":
    case "quit":
    case "q":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Invalid command. Please try again.");
      displayMenu();
      break;
  }
}

// Start the application
console.log("Welcome to the Wallet CLI");
displayMenu();
