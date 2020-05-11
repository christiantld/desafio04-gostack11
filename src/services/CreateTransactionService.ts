import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction {
    const findBalance = this.transactionsRepository.getBalance();

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    if (transaction.type === 'outcome') {
      if (transaction.value > findBalance.total) {
        throw Error(
          "You can't create an outcome transaction withou a valid balance",
        );
      }
    }

    return transaction;
  }
}

export default CreateTransactionService;
