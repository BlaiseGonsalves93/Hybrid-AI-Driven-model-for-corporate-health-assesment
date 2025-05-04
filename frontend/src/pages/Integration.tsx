import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, Braces, ExternalLink, Server, Copy } from "lucide-react";

export default function Integration() {
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const backendEndpointExample = "http://127.0.0.1:8082";

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Backend Integration</h1>
        <p className="text-muted-foreground">
          Connect your Python financial analysis backend to FinWise
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Backend Setup Instructions
            </CardTitle>
            <CardDescription>
              How to set up your Python backend to work with FinWise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800">Important</h3>
                  <p className="text-sm text-amber-700">
                    You'll need to create a simple API wrapper around your Python code to expose its functionality
                    to the web interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">1. Install Required Packages</h3>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>pip install flask flask-cors</code>
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("pip install flask flask-cors", "Command copied!")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">2. Create an API Wrapper</h3>
              <p className="text-sm text-muted-foreground">
                Save the following code as <code>api.py</code> in the same directory as your main.py
              </p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>
{`from flask import Flask, request, jsonify
from flask_cors import CORS
from web_automation2 import scrape_stock_concalls_playwright
from financialratios import calculate_financial_metrics_yf, evaluate_company
from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
from sentiment import sentiment_score
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

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
        import google.generativeai as genai
        genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        
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
    app.run(debug=True, port=8082)`}
                  </code>
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(`from flask import Flask, request, jsonify
from flask_cors import CORS
from web_automation2 import scrape_stock_concalls_playwright
from financialratios import calculate_financial_metrics_yf, evaluate_company
from concalls import load_pdf_text, analyze_by_red_flag_types, evaluate_score, extract_final_score
from sentiment import sentiment_score
import os

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

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
        import google.generativeai as genai
        genai.configure(api_key="AIzaSyDjvOrPa0B5rIdKAifTpVOEWH8oTGjGvaU")
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        
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
    app.run(debug=True, port=8082)`, "API code copied!")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">3. Run the API Server</h3>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>python api.py</code>
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard("python api.py", "Command copied!")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                This will start your API server at http://localhost:8082
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Braces className="h-5 w-5 text-primary" />
              Frontend Configuration
            </CardTitle>
            <CardDescription>
              Connect the frontend to your Python backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">1. Set the Backend URL</h3>
              <p className="text-sm text-muted-foreground">
                Use the following API endpoint in the FinWise application:
              </p>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                  <code>{backendEndpointExample}</code>
                </pre>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(backendEndpointExample, "Backend URL copied!")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">2. Test Your Backend</h3>
              <p className="text-sm text-muted-foreground">
                Make sure your Python backend is running, then try these API endpoints:
              </p>
              <Tabs defaultValue="analyze">
                <TabsList className="mb-2">
                  <TabsTrigger value="analyze">Analyze Endpoint</TabsTrigger>
                  <TabsTrigger value="chat">Chat Endpoint</TabsTrigger>
                </TabsList>
                <TabsContent value="analyze" className="mt-0">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>
{`fetch('http://localhost:8082/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ companyCode: 'INFY' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`fetch('http://localhost:8082/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ companyCode: 'INFY' })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, "Code copied!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="chat" className="mt-0">
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                      <code>
{`fetch('http://localhost:8082/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyCode: 'INFY',
    metrics: {},
    financialScore: 40,
    sentimentScore: 15,
    redFlagsScore: 20,
    redFlagAnalysis: {},
    question: "How is the company performing?"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                      </code>
                    </pre>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(`fetch('http://localhost:8082/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyCode: 'INFY',
    metrics: {},
    financialScore: 40,
    sentimentScore: 15,
    redFlagsScore: 20,
    redFlagAnalysis: {},
    question: "How is the company performing?"
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, "Code copied!")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-blue-800">Next Steps:</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    After setting up your Python backend API, you can integrate it with the search
                    functionality in the FinWise dashboard.
                  </p>
                </div>
                <Button 
                  variant="default" 
                  className="w-fit"
                  onClick={() => {
                    window.location.href = "/search";
                  }}
                >
                  <span>Go to Search Page</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
          <CardDescription>
            Learn how to use the Python backend API endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">POST</span>
                /api/analyze
              </h3>
              <p className="text-sm text-muted-foreground">
                Analyzes a company based on its NSE code, performing financial ratio calculation, red flag detection, and sentiment analysis.
              </p>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Request Body:</h4>
                <div className="bg-muted p-4 rounded-md text-sm font-mono">
                  {`{ "companyCode": "INFY" }`}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Response:</h4>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
{`{
  "companyCode": "INFY",
  "financialScore": 40.5,
  "redFlagsScore": 25.2,
  "sentimentScore": 18.4,
  "totalScore": 84.1,
  "metrics": { ... },
  "redFlagAnalysis": { ... }
}`}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-mono">POST</span>
                /api/chat
              </h3>
              <p className="text-sm text-muted-foreground">
                Uses the Gemini API to answer questions based on the analysis results.
              </p>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Request Body:</h4>
                <div className="bg-muted p-4 rounded-md text-sm font-mono">
{`{
  "companyCode": "INFY",
  "metrics": { ... },
  "financialScore": 40.5,
  "sentimentScore": 18.4,
  "redFlagsScore": 25.2,
  "redFlagAnalysis": { ... },
  "question": "How is the company performing?"
}`}
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Response:</h4>
                <div className="bg-muted p-4 rounded-md text-sm font-mono">
{`{
  "answer": "Based on the financial analysis, INFY is performing well with a total score of 84.1 out of 100..."
}`}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}