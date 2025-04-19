import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { CategoryType } from '../types';
import { ShoppingCart, Coffee, Bus, Package } from 'lucide-react';

const BudgetProgress: React.FC = () => {
  const { getBudgetPercentage, getCategorySpent, getCategoryBudget } = useBudget();
  
  const categories: CategoryType[] = ['Transport', 'Groceries', 'Food', 'Other'];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCategoryIcon = (category: CategoryType) => {
    switch (category) {
      case 'Groceries':
        return <ShoppingCart className="h-5 w-5" />;
      case 'Food':
        return <Coffee className="h-5 w-5" />;
      case 'Transport':
        return <Bus className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Budget Overview</h2>
      <div className="space-y-4">
        {categories.map((category) => {
          const spent = getCategorySpent(category);
          const budget = getCategoryBudget(category);
          const percentage = getBudgetPercentage(category);
          const displayPercentage = Math.min(percentage, 100);
          
          return (
            <div key={category} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-1.5 bg-gray-100 rounded-full mr-2">
                    {getCategoryIcon(category)}
                  </div>
                  <span className="font-medium">{category}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {formatCurrency(spent)} / {formatCurrency(budget)}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getProgressColor(percentage)}`} 
                  style={{ width: `${displayPercentage}%` }}
                />
              </div>
              {percentage > 100 && (
                <p className="text-xs text-red-600 font-medium">
                  Over budget by {formatCurrency(spent - budget)}
                </p>
              )}
              {percentage > 75 && percentage <= 100 && (
                <p className="text-xs text-yellow-600 font-medium">
                  {(100 - percentage).toFixed(0)}% of budget remaining
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetProgress;