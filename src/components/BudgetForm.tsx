import React, { useState } from 'react';
import { Budget } from '../types';
import { useBudget } from '../context/BudgetContext';
import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

const BudgetForm: React.FC = () => {
  const { setBudget } = useBudget();
  const navigate = useNavigate();
  const [budgetValues, setBudgetValues] = useState<Budget>({
    Transport: 0,
    Groceries: 0,
    Food: 0,
    Other: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudgetValues({
      ...budgetValues,
      [name]: parseFloat(value) || 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBudget(budgetValues);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <DollarSign className="mr-2 text-blue-500" />
        Set Your Monthly Budget
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {Object.keys(budgetValues).map((category) => (
            <div key={category} className="transition-all duration-200 hover:scale-[1.02]">
              <label
                htmlFor={category}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {category}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id={category}
                  name={category}
                  value={budgetValues[category as keyof Budget] || ''}
                  onChange={handleChange}
                  min="0"
                  className="pl-8 w-full py-2 px-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder={`Enter ${category} budget`}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-transform duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Enter Dashboard
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;