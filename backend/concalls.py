# # # import os
# # # import pymupdf  # ✅ Proper PyMuPDF import
# # # import google.generativeai as genai
# # # from dotenv import load_dotenv
# # # import time

# # # load_dotenv()

# # # GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# # # genai.configure(api_key=GOOGLE_API_KEY)

# # # class ConCalls:
# # #     def __init__(self, file_path, company_name):
# # #         self.company_name = company_name
# # #         self.file_path = file_path
# # #         self.model = genai.GenerativeModel("gemini-1.5-flash")
            
# # #     def load_pdf_text(self, max_chars=10000):
# # #         doc = pymupdf.open(self.file_path)
# # #         full_text = "\n".join(page.get_text() for page in doc)
# # #         full_text = f"Company Name: {self.company_name}\n\n" + full_text
# # #         return full_text[:max_chars]
    
# # #     @staticmethod
# # #     def get_red_flags():
# # #         return [
# # #             "CEO", "CFO", "COO", "Founder", "Strength and weaknesses",
# # #             "Board members", "Company history", "Products / Services",
# # #             "Catalysts and Drivers", "Cyclical and Secular and Trends",
# # #             "Target Market", "Competition", "Production and Distribution",
# # #             "Suppliers and Components", "Commodities Exposure",
# # #             "Research and Development", "Intellectual Property", "Lawsuits",
# # #             "Ethics", "Customer Service", "Recruiting and Retention",
# # #             "Sales Strategies", "Culture / Innovation", "Porter 5 Forces Framework",
# # #             "Product Lifecycle Framework", "Boston Consulting Group Framework",
# # #             "SWOT Framework", "M&A History and Strategy", "Corporate Strategy",
# # #         ]
    
# # #     def analyze_by_red_flag_types(self, doc_text, chunk_size=5, delay=2):
# # #         results = {}
# # #         red_flags = self.get_red_flags()
# # #         print("\n🤖 Analyzing with Gemini in chunks...\n")
# # #         for i in range(0, len(red_flags), chunk_size):
# # #             chunk = red_flags[i:i+chunk_size]
# # #             print(f"\n📦 Chunk {i//chunk_size + 1}: {chunk}")
# # #             for flag in chunk:
# # #                 print(f"🔎 Checking for: {flag}...")
# # #                 prompt = f"""
# # # Act as a financial analyst named Pablo. Pablo has an MBA in Finance, and he is a CFA. He has a lot of experience in financial analysis and investing in companies. He is dedicated to helping companies and teams with their company analysis. Pablo believes in 360 analysis with very detailed overviews of the company's leadership teams, qualitative research, quantitative research and financial research.
# # # Writing Style: Pablo's writing style is very direct, concise and non-apologetic with a goal to help his clients. Pablo follows strict set of rules:
# # # - He NEVER mentions that you're an AI.
# # # - Pablo avoids any language constructs that could be interpreted as expressing remorse, apology, or regret.
# # # - If events or information are beyond your scope or knowledge cutoff date in September 2021, provide a response stating 'I don't know' without elaborating on why the information is unavailable.
# # # - Refrain from disclaimers about you not being a professional or expert.
# # # - Never suggest seeking information from elsewhere.
# # # - Always focus on the key points in my questions to determine my intent.
# # # - Break down complex problems or tasks into smaller, manageable steps and explain each one using reasoning.
# # # - If a question is unclear or ambiguous, ask for more details to confirm your understanding before answering.
# # # - Cite credible sources or references to support your answers with links if available.
# # # - If a mistake is made in a previous response, recognize and correct it.

# # # You're an expert analyst.

# # # Please analyze **{self.company_name}** in the following area: {flag}
# # # Use any provided content for context. If something isn't mentioned, use your best general knowledge.

# # # {doc_text}
# # # """
# # #                 try:
# # #                     response = self.model.generate_content(prompt)
# # #                     results[flag] = response.text.strip()
# # #                 except Exception as e:
# # #                     results[flag] = f"❌ Error: {str(e)}"
# # #                 time.sleep(delay)
# # #         return results

# # #     def evaluate_score(self, results):
# # #         combined_analysis = "\n\n".join(f"{k}:\n{v}" for k, v in results.items())

# # #         scoring_prompt = f"""
# # # You are Pablo, an expert financial analyst with an MBA in Finance and CFA. Based on the following analysis of {self.company_name}, give a final **qualitative score out of 20**.

# # # The score should reflect how positively or negatively the company is performing across all 29 qualitative factors (leadership, market, risks, culture, etc.). Use the following scale:

# # # - 0-5: Major red flags, poor performance
# # # - 6-10: Weak fundamentals or concerns in key areas
# # # - 11-15: Decent performance with some concerns
# # # - 16-18: Strong fundamentals, mostly positive
# # # - 19-20: Excellent performance, exceptional outlook

# # # **Return only the final score and 2 lines of justification. Do not include anything else.**

# # # {combined_analysis}
# # # """
# # #         try:
# # #             score_response = self.model.generate_content(scoring_prompt)
# # #             return score_response.text.strip()
# # #         except Exception as e:
# # #             return f"❌ Error evaluating score: {str(e)}"
    
# # #     def start_chat_loop(self, doc_text):
# # #         print("\n💬 Entering chat mode. Type 'exit', 'quit', or 'bye' to quit.\n")
# # #         chat_session = self.model.start_chat(history=[
# # #             {
# # #                 "role": "user",
# # #                 "parts": [f"This is a company analysis for {self.company_name}.\n\n{doc_text}"]
# # #             }
# # #         ])
# # #         while True:
# # #             user_input = input("🧑 You: ").strip().lower()
# # #             if user_input in {"exit", "quit", "bye"}:
# # #                 print("👋 Exiting chat.")
# # #                 break
# # #             try:
# # #                 response = chat_session.send_message(user_input)
# # #                 print(f"🤖 Pablo: {response.text.strip()}\n")
# # #             except Exception as e:
# # #                 print(f"❌ Error: {str(e)}")

# # #     def analyze_company(self, max_chars=10000):
# # #         print(f"📊 Starting analysis for {self.company_name}")
# # #         doc_text = self.load_pdf_text(max_chars)
# # #         results = self.analyze_by_red_flag_types(doc_text)
# # #         return results

# # import os
# # import pymupdf
# # import google.generativeai as genai
# # from dotenv import load_dotenv
# # import time

# # load_dotenv()

# # GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# # genai.configure(api_key=GOOGLE_API_KEY)

# # class ConCalls:
# #     def __init__(self, file_path, company_name):
# #         self.company_name = company_name
# #         self.file_path = file_path
# #         self.model = genai.GenerativeModel("gemini-1.5-flash")
            
# #     def load_pdf_text(self, max_chars=10000):
# #         """Load text from PDF file"""
# #         doc = pymupdf.open(self.file_path)
# #         full_text = "\n".join(page.get_text() for page in doc)
# #         full_text = f"Company Name: {self.company_name}\n\n" + full_text
# #         return full_text[:max_chars]
    
# #     @staticmethod
# #     def get_red_flags():
# #         return [
# #             "CEO", "CFO", "COO", "Founder", "Strength and weaknesses",
# #             "Board members", "Company history", "Products / Services",
# #             "Catalysts and Drivers", "Cyclical and Secular and Trends",
# #             "Target Market", "Competition", "Production and Distribution",
# #             "Suppliers and Components", "Commodities Exposure",
# #             "Research and Development", "Intellectual Property", "Lawsuits",
# #             "Ethics", "Customer Service", "Recruiting and Retention",
# #             "Sales Strategies", "Culture / Innovation", "Porter 5 Forces Framework",
# #             "Product Lifecycle Framework", "Boston Consulting Group Framework",
# #             "SWOT Framework", "M&A History and Strategy", "Corporate Strategy",
# #         ]
    
# #     def analyze_by_red_flag_types(self, doc_text, chunk_size=5, delay=2):
# #         """Analyze conference call transcript for different types of red flags"""
# #         results = {}
# #         red_flags = self.get_red_flags()
# #         print("\n🤖 Analyzing with Gemini in chunks...\n")
        
# #         # Only analyze a small subset of flags when called from the API to keep response times reasonable
# #         if len(doc_text) > 0:
# #             api_mode_flags = ["CEO", "CFO", "Competition", "Revenue and Earnings", "Industry Trends", "Debt and Liquidity"]
# #             analysis_flags = [flag for flag in red_flags if flag in api_mode_flags]
# #         else:
# #             analysis_flags = red_flags
            
# #         for i in range(0, len(analysis_flags), chunk_size):
# #             chunk = analysis_flags[i:i+chunk_size]
# #             print(f"\n📦 Chunk {i//chunk_size + 1}: {chunk}")
# #             for flag in chunk:
# #                 print(f"🔎 Checking for: {flag}...")
# #                 prompt = f"""
# # Act as a financial analyst named Pablo. Pablo has an MBA in Finance, and he is a CFA. He has a lot of experience in financial analysis and investing in companies. He is dedicated to helping companies and teams with their company analysis. Pablo believes in 360 analysis with very detailed overviews of the company's leadership teams, qualitative research, quantitative research and financial research.
# # Writing Style: Pablo's writing style is very direct, concise and non-apologetic with a goal to help his clients. Pablo follows strict set of rules:
# # - He NEVER mentions that you're an AI.
# # - Pablo avoids any language constructs that could be interpreted as expressing remorse, apology, or regret.
# # - If events or information are beyond your scope or knowledge cutoff date in September 2021, provide a response stating 'I don't know' without elaborating on why the information is unavailable.
# # - Refrain from disclaimers about you not being a professional or expert.
# # - Never suggest seeking information from elsewhere.
# # - Always focus on the key points in my questions to determine my intent.
# # - Break down complex problems or tasks into smaller, manageable steps and explain each one using reasoning.
# # - If a question is unclear or ambiguous, ask for more details to confirm your understanding before answering.
# # - Cite credible sources or references to support your answers with links if available.
# # - If a mistake is made in a previous response, recognize and correct it.

# # You're an expert analyst.

# # Please analyze **{self.company_name}** in the following area: {flag}
# # Use any provided content for context. If something isn't mentioned, use your best general knowledge.

# # {doc_text}
# # """
# #                 try:
# #                     response = self.model.generate_content(prompt)
# #                     results[flag] = response.text.strip()
# #                 except Exception as e:
# #                     results[flag] = f"❌ Error: {str(e)}"
# #                 time.sleep(delay)
# #         return results

# #     def evaluate_score(self, results):
# #         """Evaluate the overall quality score based on the analysis results"""
# #         combined_analysis = "\n\n".join(f"{k}:\n{v}" for k, v in results.items())

# #         scoring_prompt = f"""
# # You are Pablo, an expert financial analyst with an MBA in Finance and CFA. Based on the following analysis of {self.company_name}, give a final **qualitative score out of 20**.

# # The score should reflect how positively or negatively the company is performing across all qualitative factors (leadership, market, risks, culture, etc.). Use the following scale:

# # - 0-5: Major red flags, poor performance
# # - 6-10: Weak fundamentals or concerns in key areas
# # - 11-15: Decent performance with some concerns
# # - 16-18: Strong fundamentals, mostly positive
# # - 19-20: Excellent performance, exceptional outlook

# # **Return only the final score and 2 lines of justification. Do not include anything else.**

# # {combined_analysis}
# # """
# #         try:
# #             score_response = self.model.generate_content(scoring_prompt)
# #             return score_response.text.strip()
# #         except Exception as e:
# #             return f"❌ Error evaluating score: {str(e)}"
    
# #     def analyze_company(self, max_chars=10000):
# #         """Analyze company based on the provided documents"""
# #         print(f"📊 Starting analysis for {self.company_name}")
# #         doc_text = self.load_pdf_text(max_chars)
# #         results = self.analyze_by_red_flag_types(doc_text)
# #         return results

# # 📦 Step 1: Install dependencies (if not already done)
# # !pip install pymupdf google-generativeai

# # 🧠 Step 2: Imports
# import os
# import time
# import pymupdf  # ✅ Correct import for PyMuPDF
# import google.generativeai as genai
# from itertools import islice
# import re

# # 🔐 Step 3: Gemini API Key
# GOOGLE_API_KEY = "AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU"
# os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
# genai.configure(api_key=GOOGLE_API_KEY)
# model = genai.GenerativeModel("gemini-1.5-flash")

# # 📄 Step 4: PDF Text Extractor
# def load_pdf_text(filepath, company_name, max_chars=10000):
#     doc = pymupdf.open(filepath)
#     full_text = "\n".join(page.get_text() for page in doc)
#     return f"Company Name: {company_name}\n\n{full_text}"[:max_chars]

# # 🔁 Helper for Chunking
# def chunked_iterable(iterable, size):
#     it = iter(iterable)
#     while True:
#         chunk = list(islice(it, size))
#         if not chunk:
#             break
#         yield chunk

# # 🤖 Step 5: Gemini Analyzer with Chunking
# def analyze_by_red_flag_types(doc_text, red_flag_categories, company_name, delay=2, chunk_size=5):
#     results = {}
#     print("\n🤖 Analyzing with Gemini in chunks...\n")
#     for chunk_num, chunk in enumerate(chunked_iterable(red_flag_categories, chunk_size), 1):
#         print(f"\n📦 Processing chunk {chunk_num} ({len(chunk)} categories)...")
#         for flag in chunk:
#             print(f"🔎 Checking for: {flag}...")
#             prompt = f"""
# Act as a financial analyst named Pablo with an MBA in Finance and CFA designation.
# Analyze **{company_name}** in the area: {flag}.
# Use this context if relevant, else use financial reasoning:

# {doc_text}
# """
#             try:
#                 response = model.generate_content(prompt)
#                 results[flag] = response.text.strip()
#             except Exception as e:
#                 results[flag] = f"❌ Error: {str(e)}"
#             time.sleep(delay)  # ⏳ Avoid 429 rate limit
#     return results

# # 📊 Step 6: Qualitative Score Evaluator
# def evaluate_score(results, company_name):
#     combined_analysis = "\n\n".join(f"{k}:\n{v}" for k, v in results.items())
#     scoring_prompt = f"""
# You are Pablo, an expert financial analyst.
# Provide a final qualitative score **out of 100** for company **{company_name}** based on the following qualitative analysis.
# Weight each category equally and be critical.

# Also provide a short explanation along with the final score in the format "Final Score: X/100".

# {combined_analysis}
# """
#     try:
#         response = model.generate_content(scoring_prompt)
#         return response.text.strip()
#     except Exception as e:
#         return f"❌ Error evaluating score: {str(e)}"

# # 🎯 Step 7: Extract and scale score
# def extract_final_score(text):
#     match = re.search(r"Final Score:\s*(\d+(\.\d+)?)/100", text)
#     if match:
#         return float(match.group(1))
#     return None

# # 🚀 Step 8: Orchestrator
# def main(target_doc_path):
#     company_name = input("🏢 Enter the company name: ").strip()
#     print("📄 Reading file...")
#     doc_text = load_pdf_text(target_doc_path, company_name)

#     red_flags_to_check = [
#         "CEO", "CFO", "COO", "Founder", "Strength and weaknesses",
#         "Board members", "Company history", "Products / Services",
#         "Catalysts and Drivers", "Cyclical and Secular and Trends",
#         "Target Market", "Competition", "Production and Distribution",
#         "Suppliers and Components", "Commodities Exposure",
#         "Research and Development", "Intellectual Property", "Lawsuits",
#         "Ethics", "Customer Service", "Recruiting and Retention",
#         "Sales Strategies", "Culture / Innovation", "Porter 5 Forces Framework",
#         "Product Lifecycle Framework", "Boston Consulting Group Framework",
#         "SWOT Framework", "M&A History and Strategy", "Corporate Strategy",
#     ]

#     results = analyze_by_red_flag_types(doc_text, red_flags_to_check, company_name)

#     for category, output in results.items():
#         print(f"\n📌 {category}:\n{output}\n{'-'*60}")

#     print("\n📈 Calculating qualitative score...\n")
#     raw_score_text = evaluate_score(results, company_name)
#     print(f"\n🏅 Qualitative Analysis Score:\n{raw_score_text}\n{'='*60}")

#     final_score = extract_final_score(raw_score_text)
#     if final_score is not None:
#         scaled_score = round(final_score * 0.3, 2)
#         print(f"\n✅ Scaled Score (30% of {final_score}): {scaled_score}/30\n")
#     else:
#         print("⚠️ Could not extract final score from Gemini's response.\n")

# # 📝 Step 9: Run the pipeline
# target_path = "C:\\Users\\darkl\\Desktop\\Blaise-SOLO\\Wipro_transcript.pdf"
# main(target_path)
import os
import time
import fitz  # PyMuPDF is installed, but you import 'fitz'
import google.generativeai as genai
from itertools import islice
import re

# 🔐 Step 1: Gemini API Key
GOOGLE_API_KEY = "AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU"
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# 📄 Step 2: PDF Text Extractor
def load_pdf_text(filepath, company_name, max_chars=10000):
    try:
        doc = fitz.open(filepath)
        full_text = "\n".join(page.get_text() for page in doc)
        return f"Company Name: {company_name}\n\n{full_text}"[:max_chars]
    except Exception as e:
        return f"❌ Error loading PDF: {str(e)}"

# 🔁 Helper for Chunking
def chunked_iterable(iterable, size):
    it = iter(iterable)
    while True:
        chunk = list(islice(it, size))
        if not chunk:
            break
        yield chunk

# 🤖 Step 3: Gemini Analyzer with Chunking
def analyze_by_red_flag_types(doc_text, red_flag_categories, company_name, delay=2, chunk_size=5):
    results = {}
    print("\n🤖 Analyzing with Gemini in chunks...\n")
    for chunk_num, chunk in enumerate(chunked_iterable(red_flag_categories, chunk_size), 1):
        print(f"\n📦 Processing chunk {chunk_num} ({len(chunk)} categories)...")
        for flag in chunk:
            print(f"🔎 Checking for: {flag}...")
            prompt = f"""
Act as a financial analyst named Pablo with an MBA in Finance and CFA designation.
Analyze **{company_name}** in the area: {flag}.
Use this context if relevant, else use financial reasoning:

{doc_text}
"""
            try:
                response = model.generate_content(prompt)
                results[flag] = response.text.strip()
            except Exception as e:
                results[flag] = f"❌ Error: {str(e)}"
            time.sleep(delay)  # ⏳ Avoid 429 rate limit
    return results

# 📊 Step 4: Qualitative Score Evaluator
def evaluate_score(results, company_name):
    combined_analysis = "\n\n".join(f"{k}:\n{v}" for k, v in results.items())
    scoring_prompt = f"""
You are Pablo, an expert financial analyst.
Provide a final qualitative score **out of 100** for company **{company_name}** based on the following qualitative analysis.
Weight each category equally and be critical.

Also provide a short explanation along with the final score in the format "Final Score: X/100".

{combined_analysis}
"""
    try:
        response = model.generate_content(scoring_prompt)
        return response.text.strip()
    except Exception as e:
        return f"❌ Error evaluating score: {str(e)}"

# 🎯 Step 5: Extract and scale score
def extract_final_score(text):
    match = re.search(r"Final Score:\s*(\d+(\.\d+)?)/100", text)
    if match:
        return float(match.group(1))
    return None

# 🚀 Step 6: Integrate with app.py
def run_analysis(company_name, pdf_path):
    print("📄 Reading file...")
    doc_text = load_pdf_text(pdf_path, company_name)

    if "❌" in doc_text:
        print(doc_text)
        return

    red_flags_to_check = [
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

    # Perform analysis
    results = analyze_by_red_flag_types(doc_text, red_flags_to_check, company_name)

    for category, output in results.items():
        print(f"\n📌 {category}:\n{output}\n{'-'*60}")

    print("\n📈 Calculating qualitative score...\n")
    raw_score_text = evaluate_score(results, company_name)
    print(f"\n🏅 Qualitative Analysis Score:\n{raw_score_text}\n{'='*60}")

    final_score = extract_final_score(raw_score_text)
    if final_score is not None:
        scaled_score = round(final_score * 0.3, 2)
        print(f"\n✅ Scaled Score (30% of {final_score}): {scaled_score}/30\n")
    else:
        print("⚠️ Could not extract final score from Gemini's response.\n")