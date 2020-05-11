import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const incomeTotal = incomes.reduce((sum, income) => {
      return sum + income.value;
    }, 0);

    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcomeTotal = outcomes.reduce((sum, outcome) => {
      return sum + outcome.value;
    }, 0);

    const total = incomeTotal - outcomeTotal;

    const balance: Balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
