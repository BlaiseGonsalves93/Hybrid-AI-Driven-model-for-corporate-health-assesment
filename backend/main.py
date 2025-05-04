from web_automation2 import scrape_stock_concalls_playwright
from financialratios import calculate_financial_metrics_yf, evaluate_company
from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
from sentiment import sentiment_score
import google.generativeai as genai
import os

# 🔐 Gemini API Key
genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
model = genai.GenerativeModel("models/gemini-1.5-flash")


# 🚫 Obscenity filter
def is_clean_input(text):
    banned_words = ["sex", "nude", "drugs", "kill", "bomb", "terror", "porn", "hate"]
    return not any(word in text.lower() for word in banned_words)

# 🧠 Gemini Prompt Builder
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

def run_webautomation(nse_code):
    return scrape_stock_concalls_playwright(nse_code)

def run_concalls(nse_code, pdf_path):
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
    summary = "\n".join(f"{k}: {v[:200]}..." for k, v in list(results.items())[:5])
    return summary, redflag_score

def run_sentiment(nse_code):
    try:
        score = sentiment_score(nse_code)
        return f"Sentiment score (scaled to 20): {round(score * 0.2, 2)}", round(score * 0.2, 2)
    except Exception as e:
        return f"Sentiment analysis failed: {e}", 0

def run_financial_ratios(nse_code):
    metrics = calculate_financial_metrics_yf(nse_code)
    score = evaluate_company(metrics)
    return metrics, score

def chatbot_loop(company, metrics, fin_score, sent_score, redflag_score, redflag_summary):
    print("\n🤖 Chatbot ready! Ask anything related to the analysis. Type 'exit' to quit.\n")
    while True:
        user_question = input("You: ")
        if user_question.lower() in ['exit', 'quit']:
            break
        if not is_clean_input(user_question):
            print("⚠️ Please keep the conversation respectful and relevant.")
            continue

        prompt = build_prompt(company, metrics, fin_score, sent_score, redflag_score, redflag_summary, user_question)
        try:
            response = model.generate_content(prompt)
            print("\nAssistant:", response.text.strip(), "\n")
        except Exception as e:
            print("❌ Gemini API Error:", str(e))

def main():
    nse_code = input("Enter the NSE code of the company (e.g., INFY): ").strip().upper()

    print("\n[1/4] Downloading conference call transcript...")
    pdf_path = run_webautomation(nse_code)

    print("\n[2/4] Calculating financial ratios and evaluation score...")
    metrics, fin_score = run_financial_ratios(nse_code)

    print("\n[3/4] Analyzing conference call transcript for red flags...")
    redflag_summary, redflag_score = run_concalls(nse_code, pdf_path)

    print("\n[4/4] Performing sentiment analysis on recent news...")
    _, sent_score = run_sentiment(nse_code)

    total_score = round(fin_score + redflag_score + sent_score, 2)

    print("\n📊 Final Score Summary:")
    print(f"   Financial Score  : {fin_score}/50")
    print(f"   Red Flags Score  : {redflag_score}/30")
    print(f"   Sentiment Score  : {sent_score}/20")
    print(f"   🔥 Total Score    : {total_score}/100")

    # 🤖 Start Chat
    chatbot_loop(nse_code, metrics, fin_score, sent_score, redflag_score, redflag_summary)

if __name__ == "__main__":
    main()