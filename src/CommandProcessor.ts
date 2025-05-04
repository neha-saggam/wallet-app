import readline from "readline";
import { User } from "../src/User.js";

export class ProcessCommand {
  user: User;
  constructor() {
    this.user = new User();
  }

  handle(command: string, displayMenu: () => void, rl: readline.Interface) {
    switch (command.toLowerCase()) {
      case "1":
        rl.question("\nEnter username: ", (username: string) => {
          this.user.createUser(username);
          console.log(`User "${username}" registered.`);
          displayMenu();
        });
        break;

      case "2":
        const users = this.user.getUsers();
        console.log("Users:");
        console.log(users.length ? users : "No users found.");
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
}
