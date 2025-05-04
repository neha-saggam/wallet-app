import readline from "readline";
import { UserService } from "./UserService.js";

export class ProcessCommand {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  handle(command: string, displayMenu: () => void, rl: readline.Interface) {
    switch (command.toLowerCase()) {
      case "1":
        rl.question("\nEnter username: ", (username: string) => {
          try {
            this.userService.registerUser(username);
          } catch (e) {
            console.log(e);
          } finally {
            displayMenu();
          }
        });
        break;

      case "2":
        rl.question("\nEnter top up amount: ", (amount) => {
          try {
            this.userService.topUpWallet(Number(amount));
          } catch (e) {
            console.log(e);
          } finally {
            displayMenu();
          }
        });
        break;

      case "3":
        rl.question(
          "\nEnter username and amount to transfer to: ",
          (usernameAndAmount) => {
            try {
              const [username, amount] = usernameAndAmount.split(" ");
              this.userService.transferTo(username, Number(amount));
            } catch (e) {
              console.log(e);
            } finally {
              displayMenu();
            }
          }
        );
        break;

      case "4":
        try {
          this.userService.checkBalance();
        } catch (e) {
          console.log(e);
        } finally {
          displayMenu();
        }
        break;

      case "5":
        try {
          this.userService.checkMoneyReceivedAndSent();
        } catch (e) {
          console.log(e);
        } finally {
          displayMenu();
        }
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
