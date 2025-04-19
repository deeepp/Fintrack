import React from 'react';
import { TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'assistant';
  onTabChange: (tab: 'dashboard' | 'assistant') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <TrendingUp className="h-7 w-7 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">FinTrack</h1>
          </div>
          
          <nav className="w-full md:w-auto">
            <ul className="flex bg-gray-100 rounded-lg p-1 w-full">
              <li className="flex-1 md:flex-initial">
                <button
                  onClick={() => onTabChange('dashboard')}
                  className={`px-4 py-2 w-full md:w-auto rounded-lg transition-all duration-200 ${
                    activeTab === 'dashboard'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Dashboard
                </button>
              </li>
              <li className="flex-1 md:flex-initial">
                <button
                  onClick={() => onTabChange('assistant')}
                  className={`px-4 py-2 w-full md:w-auto rounded-lg transition-all duration-200 ${
                    activeTab === 'assistant'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  AI Assistant
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;