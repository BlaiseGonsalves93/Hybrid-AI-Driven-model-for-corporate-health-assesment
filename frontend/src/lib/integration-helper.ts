/**
 * Helper functions for interacting with the Python backend API
 */

const API_BASE_URL = "http://127.0.0.1:8082";

/**
 * Analyzes a company using the Python backend
 * @param companyCode - The NSE code of the company (e.g., INFY)
 */
export const analyzeCompany = async (companyCode: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to analyze company");
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing company:", error);
    throw error;
  }
};

/**
 * Send a question to the chatbot
 * @param params - The chat parameters
 */
export const chatWithBot = async (params: {
  companyCode: string;
  metrics: Record<string, unknown>;
  financialScore: number;
  sentimentScore: number;
  redFlagsScore: number;
  redFlagAnalysis: Record<string, string>;
  question: string;
}) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to get chatbot response");
    }

    return await response.json();
  } catch (error) {
    console.error("Error chatting with bot:", error);
    throw error;
  }
};

/**
 * Create a Flask API wrapper for your Python backend
 * This function returns the code needed for creating a Flask API wrapper
 * that you can save to a file named api.py in your backend folder
 */
export const getFlaskApiCode = (): string => {
  return `from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add the current directory to the path so Python can find your modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import your existing Python modules
from web_automation2 import scrape_stock_concalls_playwright
from financialratios import calculate_financial_metrics_yf, evaluate_company
from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
from sentiment import sentiment_score
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configure Gemini API
genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
model = genai.GenerativeModel("models/gemini-1.5-flash")

@app.route('/api/analyze', methods=['POST'])
def analyze_company():
    data = request.get_json()
    nse_code = data.get('companyCode', '').strip().upper()
    
    if not nse_code:
        return jsonify({'error': 'Company code is required'}), 400
    
    try:
        # Step 1: Download conference call transcript
        pdf_path = scrape_stock_concalls_playwright(nse_code)
        
        # Step 2: Calculate financial ratios
        metrics, fin_score = calculate_financial_metrics_yf(nse_code)
        
        # Step 3: Analyze conference call for red flags
        doc_text = load_pdf_text(pdf_path, nse_code)
        
        red_flag_categories = [
            "CEO", "CFO", "COO", "Founder", "Strength and weaknesses",
            "Board members", "Company history", "Products / Services",
            "Catalysts and Drivers", "Cyclical and Secular and Trends",
            "Target Market", "Competition", "Production and Distribution",
            "Suppliers and Components", "Commodities Exposure",
            "Research and Development", "Intellectual Property", "Lawsuits",
            "Ethics", "Customer Service", "Recruiting and Retention",
            "Sales Strategies", "Culture / Innovation", "Porter 5 Forces Framework",
            "Product Lifecycle Framework", "Boston Consulting Group Framework",
            "SWOT Framework", "M&A History and Strategy", "Corporate Strategy",
        ]
        
        results = analyze_by_red_flag_types(doc_text, red_flag_categories, nse_code)
        score_text = evaluate_score(results, nse_code)
        redflag_score = extract_final_score(score_text)
        
        if redflag_score is not None:
            redflag_score = round(redflag_score * 0.3, 2)
        else:
            redflag_score = 0
            
        redflag_summary = {k: v[:200] + "..." for k, v in results.items()}
        
        # Step 4: Sentiment analysis
        sentiment_result = sentiment_score(nse_code)
        sent_score = round(sentiment_result * 0.2, 2)
        
        # Calculate total score
        total_score = round(fin_score + redflag_score + sent_score, 2)
        
        return jsonify({
            'companyCode': nse_code,
            'financialScore': fin_score,
            'redFlagsScore': redflag_score,
            'sentimentScore': sent_score,
            'totalScore': total_score,
            'metrics': metrics,
            'redFlagAnalysis': redflag_summary
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat_with_bot():
    data = request.get_json()
    company = data.get('companyCode', '')
    metrics = data.get('metrics', {})
    fin_score = data.get('financialScore', 0)
    sent_score = data.get('sentimentScore', 0)
    redflag_score = data.get('redFlagsScore', 0)
    redflag_summary = data.get('redFlagAnalysis', {})
    user_question = data.get('question', '')
    
    if not user_question or not company:
        return jsonify({'error': 'Question and company code are required'}), 400
    
    # Clean input check
    banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
    if any(word in user_question.lower() for word in banned_words):
        return jsonify({'answer': 'Please keep the conversation respectful and relevant.'}), 200
    
    try:
        prompt = f"""
You are a professional AI assistant focused on finance. Use ONLY the context below to answer.

---
📊 Financial Ratios for {company}:
Metrics: {metrics}
Score (out of 50): {fin_score}

📰 Sentiment Analysis:
News Sentiment Score: {sent_score}/20

🚩 Red Flag Analysis:
Score: {redflag_score}/30
Key Observations:
{redflag_summary}
---

Now answer the following question based ONLY on the above:
\\"{user_question}\\"

If the question is unrelated, reply: \\"Sorry, I can only answer questions related to the financial, sentiment, and red flag analysis.\\"
"""
        
        response = model.generate_content(prompt)
        return jsonify({'answer': response.text.strip()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8082)`;
};

/**
 * Connect the ChatBot component to the Python backend
 * This updates our ChatBot component to use the actual Python backend instead of mocked data
 */
export const connectChatBotToBackend = async (
  company: string,
  metrics: Record<string, unknown>,
  financialScore: number,
  sentimentScore: number,
  redFlagsScore: number,
  redFlagAnalysis: Record<string, string>,
  question: string
) => {
  try {
    const response = await chatWithBot({
      companyCode: company,
      metrics,
      financialScore,
      sentimentScore,
      redFlagsScore,
      redFlagAnalysis,
      question
    });
    
    return response.answer;
  } catch (error) {
    console.error("Error connecting to chatbot:", error);
    return "Sorry, I encountered an error while processing your question. Please try again later.";
  }
};
