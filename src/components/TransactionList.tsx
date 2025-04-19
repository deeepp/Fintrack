import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { ShoppingCart, Coffee, Bus, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionList: React.FC = () => {
  const { transactions } = useBudget();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Groceries':
        return <ShoppingCart className="h-5 w-5 text-blue-600" />;
      case 'Food':
        return <Coffee className="h-5 w-5 text-orange-600" />;
      case 'Transport':
        return <Bus className="h-5 w-5 text-purple-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No transactions yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200">Recent Transactions</h2>
      <div className="divide-y divide-gray-200">
        {transactions.slice().reverse().map((transaction) => (
          <div 
            key={transaction.id} 
            className="p-4 hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full mr-4 ${
                transaction.type === 'Income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {transaction.type === 'Income' ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  getCategoryIcon(transaction.category)
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {transaction.type === 'Income' ? 'Income' : transaction.category}
                </p>
                <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
              </div>
            </div>
            <div className={`font-bold ${
              transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'Income' ? '+' : '-'} {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;