  import { DtoTransaction, Transaction } from '@/models/transaction';
  import { formatDateForTransaction } from './formatDate';
  // DtoTransaction'ı Transaction'a dönüştüren fonksiyon
  const convertDtoTransactionToTransaction = (dtoTransaction) => {
    return {
      id: dtoTransaction.id, // DtoTransaction'dan id'yi al
      title: dtoTransaction.title,
      description: dtoTransaction.description, // Opsiyonel olduğu için direkt kopyalanabilir
      amount: dtoTransaction.amount,
      createTime: formatDateForTransaction(dtoTransaction.createTime), // Tarih string olarak tutuluyor, direk kopyalanabilir
      endDate: formatDateForTransaction(dtoTransaction.endDate),
      transactionType: dtoTransaction.transactionType,
      userId: dtoTransaction.user.id, // DtoTransaction'daki user'ı userId olarak atıyoruz
      categoryId: dtoTransaction.category.id, // Category'nin id'sini categoryId olarak alıyoruz
    };
  };

  export default convertDtoTransactionToTransaction;
