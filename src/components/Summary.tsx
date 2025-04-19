import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Summary: React.FC = () => {
  const { getTotalIncome, getTotalExpense } = useBudget();
  
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const balance = totalIncome - totalExpense;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 transition-transform hover:scale-[1.02] duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Total Income</h3>
          <div className="p-2 bg-green-100 rounded-full">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-green-600 mt-2">{formatCurrency(totalIncome)}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500 transition-transform hover:scale-[1.02] duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Total Expense</h3>
          <div className="p-2 bg-red-100 rounded-full">
            <TrendingDown className="h-5 w-5 text-red-600" />
          </div>
        </div>
        <p className="text-2xl font-bold text-red-600 mt-2">{formatCurrency(totalExpense)}</p>
      </div>
      
      <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${balance >= 0 ? 'border-blue-500' : 'border-yellow-500'} transition-transform hover:scale-[1.02] duration-200`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-700">Current Balance</h3>
          <div className={`p-2 ${balance >= 0 ? 'bg-blue-100' : 'bg-yellow-100'} rounded-full`}>
            {balance >= 0 ? (
              <TrendingUp className="h-5 w-5 text-blue-600" />
            ) : (
              <TrendingDown className="h-5 w-5 text-yellow-600" />
            )}
          </div>
        </div>
        <p 
          className={`text-2xl font-bold mt-2 ${
            balance >= 0 ? 'text-blue-600' : 'text-yellow-600'
          }`}
        >
          {formatCurrency(balance)}
        </p>
      </div>
    </div>
  );
};

export default Summary;