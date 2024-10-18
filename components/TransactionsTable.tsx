import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className='px-4'>علت</TableHead>
          <TableHead className='px-4'>مقدار</TableHead>
          <TableHead className='px-4'>وضعیت</TableHead>
          <TableHead className='px-4'>تاریخ</TableHead>
          <TableHead className='px-4 max-md:hidden'>مکان</TableHead>
          <TableHead className='px-4 max-md:hidden'>نوع</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);

          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <TableRow
              key={t.$id}
              className={`${
                isDebit || amount[0] === "-"
                  ? "bg-red-50 hover:bg-red-100"
                  : "bg-green-50 hover:bg-green-100"
              }`}
            >
              <TableCell className='max-w-[250px]'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-14 truncate font-semibold text-[#344054]'>
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`font-semibold ${
                  isDebit || amount[0] === "-"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell>
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className='text-nowrap'>
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className='max-md:hidden capitalize text-nowrap'>
                {t.paymentChannel}
              </TableCell>
              <TableCell className='max-md:hidden'>
                <CategoryBadge category={t.category} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
