import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BudgetForm from '../components/BudgetForm';
import { useBudget } from '../context/BudgetContext';
import { TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { budget } = useBudget();
  const navigate = useNavigate();

  // Redirect to dashboard if budget is already set
  useEffect(() => {
    if (budget) {
      navigate('/dashboard');
    }
  }, [budget, navigate]);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <TrendingUp className="h-7 w-7 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">FinTrack</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Set a monthly budget, track your income and expenses, and get personalized insights to improve your financial health.
          </p>
          <div className="bg-blue-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">With FinTrack you can:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span> 
                Set and track category-specific budgets
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span> 
                Log income and expenses in real-time
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span> 
                Visualize your spending patterns
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span> 
                Get AI-powered financial insights (coming soon)
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:w-1/2 w-full max-w-md mx-auto">
          <BudgetForm />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;