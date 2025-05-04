export class Transaction {
    amount: number;
    type: "credit" | "debit";
    timestamp: Date;
  
    constructor(amount: number, type: "credit" | "debit") {
      this.amount = amount;
      this.type = type;
      this.timestamp = new Date();
    }
  }
  