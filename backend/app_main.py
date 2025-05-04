# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai

# # 🔧 Local imports
# from web_automation2 import scrape_stock_concalls_playwright
# from financialratios import calculate_financial_metrics_yf, evaluate_company
# from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
# from sentiment import sentiment_score

# # ✅ Gemini setup
# genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
# model = genai.GenerativeModel("models/gemini-1.5-flash")

# # ✅ Flask setup
# app = Flask(__name__)
# CORS(app)

# # 🚫 Obscenity filter
# def is_clean_input(text):
#     banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
#     return not any(word in text.lower() for word in banned_words)

# # 🧠 Gemini prompt builder
# def build_prompt(company, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question):
#     return f"""
# You are a professional AI assistant focused on finance. Use ONLY the context below to answer.

# ---
# 📊 Financial Ratios for {company}:
# Metrics: {metrics}
# Score (out of 50): {fin_score}

# 📰 Sentiment Analysis:
# News Sentiment Score: {sent_score}/20

# 🚩 Red Flag Analysis:
# Score: {redflag_score}/30
# Key Observations:
# {redflag_summary}
# ---

# Now answer the following question based ONLY on the above:
# \"{user_question}\"

# If the question is unrelated, reply: \"Sorry, I can only answer questions related to the financial, sentiment, and red flag analysis.\"
# """

# # 🚀 Route: Analyze company
# @app.route('/api/analyze', methods=['POST'])
# def analyze():
#     data = request.get_json()
#     nse_code = data.get('companyCode', '').strip().upper()
#     if not nse_code:
#         return jsonify({'error': 'Company code is required'}), 400

#     try:
#         # Step 1: Download transcript
#         pdf_path = scrape_stock_concalls_playwright(nse_code)

#         # Step 2: Financial metrics
#         metrics = calculate_financial_metrics_yf(nse_code)
#         fin_score = evaluate_company(metrics)

#         # Step 3: Red flag analysis
#         doc_text = load_pdf_text(pdf_path, nse_code)
#         red_flag_categories = [
#             "CEO", "CFO", "COO", "Founder", "Strength and weaknesses",
#             "Board members", "Company history", "Products / Services",
#             "Catalysts and Drivers", "Cyclical and Secular and Trends",
#             "Target Market", "Competition", "Production and Distribution",
#             "Suppliers and Components", "Commodities Exposure",
#             "Research and Development", "Intellectual Property", "Lawsuits",
#             "Ethics", "Customer Service", "Recruiting and Retention",
#             "Sales Strategies", "Culture / Innovation", "Porter 5 Forces Framework",
#             "Product Lifecycle Framework", "Boston Consulting Group Framework",
#             "SWOT Framework", "M&A History and Strategy", "Corporate Strategy",
#         ]
#         results = analyze_by_red_flag_types(doc_text, red_flag_categories, nse_code)
#         # results = analyze_by_red_flag_types(doc_text, red_flag_categories, nse_code)
#         score_text = evaluate_score(results, nse_code)
#         redflag_score = extract_final_score(score_text)
#         redflag_score = round(redflag_score * 0.3, 2) if redflag_score is not None else 0
#         redflag_summary = {k: v[:200] + "..." for k, v in results.items()}

#         # Step 4: Sentiment analysis
#         sentiment_result = sentiment_score(nse_code)
#         sent_score = round(sentiment_result * 0.2, 2)

#         total_score = round(fin_score + redflag_score + sent_score, 2)

#         return jsonify({
#             'companyCode': nse_code,
#             'financialScore': fin_score,
#             'redFlagsScore': redflag_score,
#             'sentimentScore': sent_score,
#             'totalScore': total_score,
#             'metrics': metrics,
#             'redFlagAnalysis': redflag_summary
#         })

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # 💬 Route: Chat with bot
# @app.route('/api/chat', methods=['POST'])
# def chat():
#     data = request.get_json()
#     company = data.get('companyCode', '')
#     metrics = data.get('metrics', {})
#     fin_score = data.get('financialScore', 0)
#     sent_score = data.get('sentimentScore', 0)
#     redflag_score = data.get('redFlagsScore', 0)
#     redflag_summary = data.get('redFlagAnalysis', {})
#     user_question = data.get('question', '')

#     if not user_question or not company:
#         return jsonify({'error': 'Question and company code are required'}), 400

#     if not is_clean_input(user_question):
#         return jsonify({'answer': 'Please keep the conversation respectful and relevant.'}), 200

#     try:
#         prompt = build_prompt(company, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question)
#         response = model.generate_content([prompt])
#         return jsonify({'answer': response.text.strip()}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=8082)

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# 🔧 Local imports
from web_automation2 import scrape_stock_concalls_playwright
from financialratios import calculate_financial_metrics_yf, evaluate_company
from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
from sentiment import sentiment_score

# ✅ Gemini setup
genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
model = genai.GenerativeModel("models/gemini-1.5-flash")

# ✅ Flask setup
app = Flask(__name__)

# Allow only requests from http://localhost:8080 (Vite frontend)
CORS(app, origins=['http://localhost:8080'], supports_credentials=True)

# 🚫 Obscenity filter
def is_clean_input(text):
    banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
    return not any(word in text.lower() for word in banned_words)

# 🧠 Gemini prompt builder
def build_prompt(company, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question):
    return f"""
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
\"{user_question}\"

If the question is unrelated, reply: \"Sorry, I can only answer questions related to the financial, sentiment, and red flag analysis.\"
"""

# 🚀 Route: Analyze company
@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    nse_code = data.get('companyCode', '').strip().upper()
    if not nse_code:
        return jsonify({'error': 'Company code is required'}), 400

    try:
        # Step 1: Download transcript
        pdf_path = scrape_stock_concalls_playwright(nse_code)

        # Step 2: Financial metrics
        metrics = calculate_financial_metrics_yf(nse_code)
        fin_score = evaluate_company(metrics)

        # Step 3: Red flag analysis
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
        redflag_score = round(redflag_score * 0.3, 2) if redflag_score is not None else 0
        redflag_summary = {k: v[:200] + "..." for k, v in results.items()}

        # Step 4: Sentiment analysis
        sentiment_result = sentiment_score(nse_code)
        sent_score = round(sentiment_result * 0.2, 2)

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

# 💬 Route: Chat with bot
@app.route('/api/chat', methods=['POST'])
def chat():
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

    if not is_clean_input(user_question):
        return jsonify({'answer': 'Please keep the conversation respectful and relevant.'}), 200

    try:
        prompt = build_prompt(company, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question)
        response = model.generate_content([prompt])
        return jsonify({'answer': response.text.strip()}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port = 8082, use_reloader=False)
