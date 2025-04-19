import React, { useEffect, useState } from 'react';

const AIAssistant: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<
    { title: string; content: string }[]
  >([]);

  useEffect(() => {
    // Simulate loading delay (e.g. calling an API)
    const timeout = setTimeout(() => {
      setInsights([
        {
          title: "🚨 High Spending Alert: Food",
          content:
            "You've spent 85% of your monthly food budget. Try planning meals ahead or reducing takeout to stay on track.",
        },
        {
          title: "✅ Great Job: Transport",
          content:
            "You're well within your transport budget this month. Keep it up!",
        },
        {
          title: "📊 Suggestion: Balance Income & Expenses",
          content:
            "Your expenses are nearing your total income. Consider increasing income or trimming non-essential costs.",
        },
        {
          title: "💡 Tip: Use Cashback Cards",
          content:
            "Using a cashback card for groceries could help you save 2–5% per month on average.",
        },
      ]);
      setLoading(false);
    }, 5000); // 2-second delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">💬 AI Financial Insights</h1>

      {loading ? (
        <div className="flex items-center space-x-2 text-blue-600">
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            ></path>
          </svg>
          <p className="text-sm">Analyzing your finances...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-700 mt-2">{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
