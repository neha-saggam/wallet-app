import { User } from "./models/User";
import { Wallet } from "./models/Wallet";

export class UserService {
  currentUser: User | null;
  users: User[];

  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  registerUser(username: string) {
    const user = new User(username);
    this.users.push(user);
    this.currentUser = user;
    console.log(`User "${username}" registered.`);
  }

  topUpWallet(amount: number) {
    if (!this.currentUser) {
      throw new Error(`Please register first`);
    }
    const wallet: Wallet = this.currentUser.wallet;
    wallet.topUp(Number(amount));
  }

  transferTo(username: string, amount: number) {
    if (!this.currentUser) {
      throw new Error(`Please register first`);
    }
    if (amount <= 0) {
      throw new Error(`Amount must be positive`);
    }
    const transferToUser = this.users.find(
      (user) => user.username === username && username !== this.currentUser!.username
    );
    if (!transferToUser) {
      throw new Error(`No such user: ${username}`);
    }

    const wallet = this.currentUser.wallet;
    const walletTo = transferToUser.wallet;
    wallet.debit(Number(amount));
    walletTo.topUp(amount);
  }

  checkBalance() {
    if (!this.currentUser) {
      console.log(`Please register first`);
      return;
    }
    console.log("Balance: ", this.currentUser.wallet.balance);
  }
}
