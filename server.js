import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';
import dotenv from 'dotenv'; // Optional for .env

dotenv.config();

console.log("📦 Bootstrapping server...");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI client
let openai;
try {
  console.log("🔑 Initializing OpenAI client...");
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log("✅ OpenAI client ready.");
} catch (err) {
  console.error("❌ Failed to initialize OpenAI client:", err);
}

// Middleware
console.log("🔧 Setting up middleware...");
app.use(cors());
app.use(express.json());
console.log("✅ Middleware ready.");


// Main AI analysis route
app.post('/api/analyze', async (req, res) => {
  try {
    console.log("📩 /api/analyze POST request received");
    const { transactions, budget } = req.body;

    if (!transactions || !budget) {
      console.warn("⚠️ Missing data in request body");
      return res.status(400).json({ error: 'Missing required data' });
    }

    console.log("📊 Transactions received:", transactions.length);
    console.log("💰 Budget received:", budget);

    // Compute stats
    const totalIncome = transactions.filter(t => t.type === 'Income')
                                    .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'Expense')
                                     .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    console.log(`📈 Income: ${totalIncome}, Expense: ${totalExpense}, Balance: ${balance}`);

    const expensesByCategory = {};
    transactions.filter(t => t.type === 'Expense').forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });
    console.log("📂 Expenses by Category:", expensesByCategory);

    const categoryInsights = Object.entries(expensesByCategory).map(([category, spent]) => {
      const budgeted = budget[category] || 0;
      const percentageUsed = budgeted > 0 ? (spent / budgeted) * 100 : 0;
      return {
        category,
        spent,
        budgeted,
        percentageUsed: percentageUsed.toFixed(1),
        remaining: budgeted - spent
      };
    });
    console.log("📌 Category Insights:", categoryInsights);

    // Prompt for OpenAI
    const promptData = {
      totalIncome, totalExpense, balance,
      budget, expensesByCategory,
      categoryInsights,
      transactions: transactions.map(t => ({
        type: t.type,
        category: t.category,
        amount: t.amount,
        date: t.date
      }))
    };

    console.log("🧠 Sending prompt to OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are a financial analyst assistant. Analyze the user's budget and transaction data to provide helpful insights, suggestions for saving money, and observations about their spending patterns.`
        },
        {
          role: "user",
          content: `Please analyze my financial data and provide insights: ${JSON.stringify(promptData, null, 2)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const insight = completion.choices[0].message.content;
    console.log("✅ OpenAI returned insights:", insight);
    res.json({ insight });

  } catch (error) {
    console.error("🔥 Error during analysis:", error);
    res.status(500).json({ 
      error: 'Failed to generate insights',
      details: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  console.log("🩺 Health check endpoint hit");
  res.json({ status: 'ok' });
});

// Error monitoring
process.on('uncaughtException', err => {
  console.error("❗ Uncaught Exception:", err);
});
process.on('unhandledRejection', err => {
  console.error("❗ Unhandled Rejection:", err);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
  console.log(`🔍 AI Insights: http://localhost:${PORT}/api/analyze`);
});
