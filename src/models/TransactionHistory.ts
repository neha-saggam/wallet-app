import { Transaction } from "./Transaction.js";

export class TransactionHistory {
  private transactions: Transaction[] = [];

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  getAll(): Transaction[] {
    return this.transactions;
  }
}
