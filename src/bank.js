class BankAccount {
  constructor(accountNumber, ownerName, initialBalance = 0) {
    this.accountNumber = accountNumber;
    this.ownerName = ownerName;
    this.balance = initialBalance;
    this.transactions = [];
    this.isActive = true;
  }

  deposit(amount) {
    if (!this.isActive) throw new Error("Account is inactive");
    if (amount <= 0) throw new Error("Amount must be positive");

    this.balance += amount;
    this.transactions.push({ type: "deposit", amount });
    return this.balance;
  }

  withdraw(amount) {
    if (!this.isActive) throw new Error("Account is inactive");
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");

    this.balance -= amount;
    this.transactions.push({ type: "withdrawal", amount });
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  getAccountNumber() {
    return this.accountNumber;
  }

  getOwnerName() {
    return this.ownerName;
  }

  updateOwnerName(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Invalid owner name");
    }

    this.ownerName = name;
    return this.ownerName;
  }

  activate() {
    this.isActive = true;
    return this.isActive;
  }

  deactivate() {
    this.isActive = false;
    return this.isActive;
  }

  isAccountActive() {
    return this.isActive;
  }

  transferTo(targetAccount, amount) {
    if (!(targetAccount instanceof BankAccount)) {
      throw new Error("Invalid target account");
    }

    this.withdraw(amount);
    targetAccount.deposit(amount);

    return true;
  }

  getTransactionCount() {
    return this.transactions.length;
  }

  getTransactions() {
    return [...this.transactions];
  }

  getDeposits() {
    return this.transactions.filter(
      transaction => transaction.type === "deposit"
    );
  }

  getWithdrawals() {
    return this.transactions.filter(
      transaction => transaction.type === "withdrawal"
    );
  }

  getTotalDeposited() {
    return this.getDeposits().reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }

  getTotalWithdrawn() {
    return this.getWithdrawals().reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }

  hasTransactions() {
    return this.transactions.length > 0;
  }

  canWithdraw(amount) {
    return this.isActive && amount > 0 && amount <= this.balance;
  }

  getAccountSummary() {
    return {
      accountNumber: this.accountNumber,
      ownerName: this.ownerName,
      balance: this.balance,
      isActive: this.isActive,
      transactionCount: this.transactions.length
    };
  }
}

module.exports = BankAccount;