import { Wallet } from "./Wallet";

export class User {
    static idCounter = 1;
    id: number;
    username: string;
    wallet: Wallet;
  
    constructor(username: string) {
      this.id = User.idCounter++;
      this.username = username;
      this.wallet = new Wallet(this.id);
    }
  
    assignWallet(wallet: Wallet) {
      if (wallet.userId !== this.id) {
        throw new Error("Wallet does not belong to this user");
      }
      this.wallet = wallet;
    }
  }