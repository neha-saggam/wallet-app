export class Wallet {
    static idCounter = 1;
    id: number;
    userId: number;
    balance: number;
  
    constructor(userId: number) {
      this.id = Wallet.idCounter++;
      this.userId = userId;
      this.balance = 0;
    }
  
    topUp(amount: number) {
      if (amount <= 0) throw new Error("Amount must be positive");
      this.balance += amount;
    }
  }
  