# # import re
# # import google.generativeai as genai
# # from financialratios import calculate_financial_metrics_yf, evaluate_company
# # from sentiment import sentiment_score
# # from concalls import run_analysis, extract_final_score
# # import os

# # # 🔐 Set Gemini API Key
# # genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
# # model = genai.GenerativeModel("models/gemini-1.5-flash")


# # # 🚫 Basic profanity/irrelevance filter
# # def is_clean_input(text):
# #     banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
# #     return not any(word in text.lower() for word in banned_words)

# # # 📜 Build prompt from all outputs
# # def build_prompt(company_name, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question):
# #     return f"""
# # You are a professional AI assistant focused on finance. Use ONLY the context below to answer.

# # ---
# # 📊 Financial Ratios for {company_name}:
# # Metrics: {metrics}
# # Score (out of 50): {fin_score}

# # 📰 Sentiment Analysis:
# # News Sentiment Score: {sent_score}/100 (Weighted: {round(sent_score * 0.2, 2)}/20)

# # 🚩 Red Flag Analysis:
# # Score: {redflag_score}/100 (Weighted: {round(redflag_score * 0.3, 2)}/30)
# # Key Observations:
# # {redflag_summary}
# # ---

# # Now answer the following question based ONLY on the above:
# # \"{user_question}\"

# # If the question is unrelated, reply: \"Sorry, I can only answer questions related to the financial, sentiment, and red flag analysis.\"
# # """

# # # 🧠 Main analysis workflow
# # def run_all_analyses(company_name, transcript_path):
# #     # Financial analysis
# #     print("📊 Running financial ratio analysis...")
# #     metrics = calculate_financial_metrics_yf(company_name)
# #     fin_score = evaluate_company(metrics)

# #     # Sentiment analysis
# #     print("📰 Running sentiment analysis...")
# #     sent_score = sentiment_score(company_name, verbose=False)

# #     # Red flag analysis
# #     print("🚩 Running red flag analysis...")
# #     os.environ["GOOGLE_API_KEY"] = "AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU"
# #     redflag_summary, redflag_score = run_analysis(company_name, transcript_path)

# #     return metrics, fin_score, sent_score, redflag_score, redflag_summary

# # # 💬 Chat interface
# # def chatbot_loop(context):
# #     print("\n🤖 Chatbot ready! Ask your question or type 'exit' to quit.\n")
# #     while True:
# #         user_question = input("You: ")
# #         if user_question.lower() in ['exit', 'quit']:
# #             break
# #         if not is_clean_input(user_question):
# #             print("⚠️ Please keep the conversation respectful and relevant.")
# #             continue

# #         prompt = build_prompt(*context, user_question)
# #         try:
# #             response = model.generate_content(prompt)
# #             print("\nAssistant:", response.text.strip(), "\n")
# #         except Exception as e:
# #             print("❌ Error from Gemini:", str(e))

# # # 🏁 Run it all
# # if __name__ == "__main__":
# #     company = input("🏢 Enter Company Name: ")
# #     pdf_path = input("📄 Enter path to transcript PDF: ")

# #     metrics, fin_score, sent_score, redflag_score, redflag_summary = run_all_analyses(company, pdf_path)
# #     context = (company, metrics, fin_score, sent_score, redflag_score, redflag_summary)

# #     chatbot_loop(context)

# # chatbot_response.py

# import re
# import google.generativeai as genai
# import os

# # Setup Gemini
# GOOGLE_API_KEY = "YOUR_GEMINI_API_KEY"  # Replace with your actual key or use dotenv
# os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
# genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel("gemini-1.5-flash")

# # Function to generate a chatbot response from the combined analysis output
# def generate_chatbot_response(user_query, analysis_results):
#     """
#     :param user_query: Natural language question from user
#     :param analysis_results: Dictionary with keys: 'financial_ratios', 'concalls', 'sentiment'
#     :return: Chatbot response as string
#     """
#     prompt = f"""
# You are Pablo, an intelligent financial analyst chatbot with a CFA and MBA in Finance.
# Answer the following query using the data provided from 3 different sources: Financial Ratios, Conference Call Red Flag Analysis, and News-based Sentiment.
# Be crisp, analytical, and cite which source you're referencing (e.g. [Financials], [Concall], [Sentiment]).

# User's Question:
# {user_query}

# ---

# 📊 Financial Ratios:
# {analysis_results.get("financial_ratios", "N/A")}

# 📄 Conference Call Summary:
# {analysis_results.get("concalls", "N/A")}

# 📰 Sentiment Score and Summary:
# {analysis_results.get("sentiment", "N/A")}

# Only answer based on the above data. If something is missing, say "insufficient data".
# """

#     try:
#         response = model.generate_content(prompt)
#         return response.text.strip()
#     except Exception as e:
#         return f"❌ Error generating response: {str(e)}"

# # Example CLI chatbot loop (can be replaced by web/chat UI later)
# if __name__ == "__main__":
#     print("🤖 Pablo the Analyst Chatbot is online!\n")

#     # 🧠 Example dummy input - Replace with real results from main.py
#     analysis_results = {
#         "financial_ratios": """
# - Total Current Assets: ₹500 Cr
# - Total Liabilities: ₹200 Cr
# - Operating Cash Flow: ₹100 Cr
# - Final Financial Score: 42/50
# """,
#         "concalls": """
# - Ethics: No major issues found.
# - R&D: Company is investing in EV tech.
# - Final Qualitative Score: 84/100
# """,
#         "sentiment": """
# - 7/10 articles positive
# - Public sentiment score: 80/100
# """
#     }

#     while True:
#         user_input = input("💬 Ask me anything (type 'exit' to quit): ")
#         if user_input.lower() in ["exit", "quit", "bye", "thank you", "thank you for your time", "thank you for your help", "thank you for your time and help",]:
#             print("👋 Exiting chatbot. Have a great day!")
#             break
#         response = generate_chatbot_response(user_input, analysis_results)
#         print(f"\n🧠 Pablo says:\n{response}\n")

import re
import google.generativeai as genai
from financialratios import calculate_financial_metrics_yf, evaluate_company
from sentiment import sentiment_score
from concalls import run_analysis, extract_final_score
import os

# 🔐 Set Gemini API Key
genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
model = genai.GenerativeModel("models/gemini-1.5-flash")


# 🚫 Basic profanity/irrelevance filter
def is_clean_input(text):
    banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
    return not any(word in text.lower() for word in banned_words)

# 📜 Build prompt from all outputs
def build_prompt(company_name, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question):
    return f"""
You are a professional AI assistant focused on finance. Use ONLY the context below to answer.

---
📊 Financial Ratios for {company_name}:
Metrics: {metrics}
Score (out of 50): {fin_score}

📰 Sentiment Analysis:
News Sentiment Score: {sent_score}/100 (Weighted: {round(sent_score * 0.2, 2)}/20)

🚩 Red Flag Analysis:
Score: {redflag_score}/100 (Weighted: {round(redflag_score * 0.3, 2)}/30)
Key Observations:
{redflag_summary}
---

Now answer the following question based ONLY on the above:
\"{user_question}\"

If the question is unrelated, reply: \"Sorry, I can only answer questions related to the financial, sentiment, and red flag analysis.\"
"""

# 🧠 Main analysis workflow
def run_all_analyses(company_name, transcript_path):
    # Financial analysis
    print("📊 Running financial ratio analysis...")
    metrics = calculate_financial_metrics_yf(company_name)
    fin_score = evaluate_company(metrics)

    # Sentiment analysis
    print("📰 Running sentiment analysis...")
    sent_score = sentiment_score(company_name, verbose=False)

    # Red flag analysis
    print("🚩 Running red flag analysis...")
    os.environ["GOOGLE_API_KEY"] = "AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU"
    redflag_summary, redflag_score = run_analysis(company_name, transcript_path)

    return metrics, fin_score, sent_score, redflag_score, redflag_summary

# 💬 Chat interface
def chatbot_loop(context):
    print("\n🤖 Chatbot ready! Ask your question or type 'exit' to quit.\n")
    while True:
        user_question = input("You: ")
        if user_question.lower() in ['exit', 'quit']:
            break
        if not is_clean_input(user_question):
            print("⚠️ Please keep the conversation respectful and relevant.")
            continue

        prompt = build_prompt(*context, user_question)
        try:
            response = model.generate_content(prompt)
            print("\nAssistant:", response.text.strip(), "\n")
        except Exception as e:
            print("❌ Error from Gemini:", str(e))

# 🏁 Run it all
if __name__ == "__main__":
    company = input("🏢 Enter Company Name: ")
    pdf_path = input("📄 Enter path to transcript PDF: ")

    metrics, fin_score, sent_score, redflag_score, redflag_summary = run_all_analyses(company, pdf_path)
    context = (company, metrics, fin_score, sent_score, redflag_score, redflag_summary)

    chatbot_loop(context)
