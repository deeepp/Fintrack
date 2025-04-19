import React, { createContext, useContext, useState, useEffect } from 'react';
import { Budget, Transaction, TransactionType, CategoryType, BudgetContextType } from '../types';

// Create a context for the budget state
const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

// Create a provider component
export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load data from localStorage or set initial values
  const [budget, setBudget] = useState<Budget | null>(() => {
    const savedBudget = localStorage.getItem('budget');
    return savedBudget ? JSON.parse(savedBudget) : null;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Save data to localStorage when it changes
  useEffect(() => {
    if (budget) {
      localStorage.setItem('budget', JSON.stringify(budget));
    }
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add a new transaction
  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Calculate total income
  const getTotalIncome = () => {
    return transactions
      .filter((transaction) => transaction.type === 'Income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Calculate total expense
  const getTotalExpense = () => {
    return transactions
      .filter((transaction) => transaction.type === 'Expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Calculate total spent per category
  const getCategorySpent = (category: CategoryType) => {
    return transactions
      .filter((transaction) => transaction.type === 'Expense' && transaction.category === category)
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Get budget for a category
  const getCategoryBudget = (category: CategoryType) => {
    return budget ? budget[category] : 0;
  };

  // Calculate percentage of budget spent per category
  const getBudgetPercentage = (category: CategoryType) => {
    const spent = getCategorySpent(category);
    const budgetAmount = getCategoryBudget(category);
    return budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        setBudget,
        transactions,
        addTransaction,
        getTotalIncome,
        getTotalExpense,
        getCategorySpent,
        getCategoryBudget,
        getBudgetPercentage,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Create a custom hook to use the budget context
export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

export { BudgetContext };
