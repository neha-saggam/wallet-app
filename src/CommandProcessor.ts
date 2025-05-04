import readline from "readline";
import { User } from "../src/User.js";
import { Wallet } from "./Wallet.js";

export class ProcessCommand {
  currentUser: User | null;
  users: User[];

  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  handle(command: string, displayMenu: () => void, rl: readline.Interface) {
    switch (command.toLowerCase()) {
      case "1":
        rl.question("\nEnter username: ", (username: string) => {
          const user = new User(username);
          this.currentUser = user;
          this.users.push(user);
          console.log(`User "${username}" registered.`);
          displayMenu();
        });
        break;

      case "2":
        rl.question("\nEnter top up amount: ", (amount) => {
          if (!this.currentUser) {
            console.log(`Please register first`);
            displayMenu();
            return;
          }
          const wallet: Wallet = this.currentUser.wallet;
          wallet.topUp(Number(amount));
          displayMenu();
        });
        break;

      case "3":
        rl.question(
          "\nEnter username and amount to transfer to: ",
          (usernameAndAmount) => {
            const [username, amount] = usernameAndAmount.split(" ");
            const transferToUser = this.users.find((user) => user.username === username);
            if (!this.currentUser) {
              console.log(`Please register first`);
              displayMenu();
              return;
            }
            if (!transferToUser) {
                console.log(`No such user: ${transferToUser}`);
                displayMenu();
                return;
              }
            const wallet = this.currentUser.wallet;
            const walletTo = transferToUser.wallet;
            wallet.transferTo(walletTo, Number(amount));
            displayMenu();
          }
        );
        break;

      case "4":
        if (!this.currentUser) {
          console.log(`Please register first`);
          displayMenu();
          return;
        }
        console.log("Balance: ", this.currentUser.wallet.balance);
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
