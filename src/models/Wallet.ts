import { Transaction } from "./Transaction.js";
import { TransactionHistory } from "./TransactionHistory.js";

export class Wallet {
    static idCounter = 1;
    id: number;
    userId: number;
    balance: number;
    history: TransactionHistory;
  
    constructor(userId: number) {
      this.id = Wallet.idCounter++;
      this.userId = userId;
      this.balance = 0;
      this.history = new TransactionHistory();
    }
  
    topUp(amount: number) {
      this.balance += amount;
      this.history.addTransaction(new Transaction(amount, "credit"));
    }

    debit(amount: number) {
      if (this.balance < amount) {
        throw new Error(`Insufficient funds`);
        return;
      }
      this.balance -= amount;
      this.history.addTransaction(new Transaction(amount, "debit"));
    }
  }
  