import { Wallet } from "./Wallet.js";

export class User {
    static idCounter = 1;
    private id: number;
    private username: string;
    private wallet: Wallet;
  
    constructor(username: string) {
      this.id = User.idCounter++;
      this.username = username;
      this.wallet = new Wallet(this.id);
    }
  
    assignWallet(wallet: Wallet) {
      if (wallet.getUserId() !== this.id) {
        throw new Error("Wallet does not belong to this user");
      }
      this.wallet = wallet;
    }

    getWallet() {
      return this.wallet;
    }

    getUsername() {
      return this.username;
    }
  }