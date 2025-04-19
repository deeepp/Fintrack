import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudget } from '../context/BudgetContext';
import Header from '../components/Header';
import Summary from '../components/Summary';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import BudgetProgress from '../components/BudgetProgress';
import AIAssistant from '../components/AIAssistant';
import { Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { budget } = useBudget();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'assistant'>('dashboard');

  // Redirect to landing page if budget is not set
  useEffect(() => {
    if (!budget) {
      navigate('/');
    }
  }, [budget, navigate]);

  if (!budget) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {activeTab === 'dashboard' ? (
          <>
            <Summary />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TransactionList />
              </div>
              <div className="lg:col-span-1">
                <BudgetProgress />
              </div>
            </div>
            
            {/* Floating action button for adding transactions */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-label="Add transaction"
            >
              <Plus className="h-6 w-6" />
            </button>
            
            <TransactionModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
            />
          </>
        ) : (
          <AIAssistant />
        )}
      </main>
    </div>
  );
};

export default Dashboard;