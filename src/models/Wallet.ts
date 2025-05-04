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
      this.balance += amount;
    }

    debit(amount: number) {
      if (this.balance < amount) {
        throw new Error(`Insufficient funds`);
        return;
      }
      this.balance -= amount;
    }
  }
  