import yfinance as yf
import pandas as pd
import requests

def get_ticker_from_name(company_name):
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    url = f"https://query2.finance.yahoo.com/v1/finance/search?q={company_name}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception("Failed to fetch ticker information (network issue).")

    result = response.json()
    if result.get("quotes"):
        ticker = result["quotes"][0].get("symbol")
        if ticker:
            return ticker
    raise ValueError("Company name not found.")

def find_closest_match(target, column_list):
    matches = [col for col in column_list if isinstance(col, str) and target.lower() in col.lower()]
    return matches[0] if matches else None

def calculate_financial_metrics_yf(company_name):
    ticker = get_ticker_from_name(company_name)
    print(f"✔️ Found ticker: {ticker}")

    company = yf.Ticker(ticker)
    bs = company.balance_sheet.T
    cf = company.cashflow.T

    if bs.empty or cf.empty:
        raise ValueError("Failed to fetch financial statements.")

    bs = bs.apply(pd.to_numeric, errors='coerce')
    cf = cf.apply(pd.to_numeric, errors='coerce')

    print("\n🧾 Balance Sheet Columns:")
    print(bs.columns.tolist())

    print("\n💵 Cash Flow Columns:")
    print(cf.columns.tolist())

    latest = bs.index[0]

    def safe_get(df, label):
        col = find_closest_match(label, df.columns)
        return df.loc[latest, col] if col and col in df.columns else 0

    receivables = safe_get(bs, "Receivables")
    inventory = safe_get(bs, "Inventory")
    cash_bank = safe_get(bs, "Cash")

    net_block = safe_get(bs, "Net PPE")
    investments = safe_get(bs, "Investments")
    other_assets = safe_get(bs, "Other Assets")

    borrowings = safe_get(bs, "Long Term Debt")
    other_liabilities = safe_get(bs, "Other Liabilities")
    equity = safe_get(bs, "Ordinary Shares")
    reserves = safe_get(bs, "Retained Earnings")
    total_assets = safe_get(bs, "Total Assets")

    op_cash = safe_get(cf, "Operating Cash Flow")
    inv_cash = safe_get(cf, "Investing Cash Flow")
    fin_cash = safe_get(cf, "Financing Cash Flow")

    total_current_assets = receivables + inventory + cash_bank
    total_long_term_assets = net_block + investments + other_assets
    total_liabilities = borrowings + other_liabilities
    shareholders_equity = equity + reserves
    liabilities_and_equity = total_liabilities + shareholders_equity

    return {
        "Total Current Assets": total_current_assets,
        "Total Long Term Assets": total_long_term_assets,
        "Total Assets": total_assets,
        "Total Liabilities": total_liabilities,
        "Shareholders' Equity": shareholders_equity,
        "Liabilities + Equity": liabilities_and_equity,
        "Net Cash from Operating Activities": op_cash,
        "Net Cash from Investing Activities": inv_cash,
        "Net Cash from Financing Activities": fin_cash,
        "Cash at End of Period": cash_bank
    }

def evaluate_company(metrics):
    score = 0
    total = 50  # Total score is now out of 50

    # Liquidity Ratio
    if metrics["Total Liabilities"]:
        liquidity_ratio = metrics["Total Current Assets"] / metrics["Total Liabilities"]
        score += 7.5 if liquidity_ratio > 2 else 5 if liquidity_ratio > 1 else 2.5

    # Leverage Ratio
    if metrics["Shareholders' Equity"]:
        leverage_ratio = metrics["Total Liabilities"] / metrics["Shareholders' Equity"]
        score += 7.5 if leverage_ratio < 1 else 5 if leverage_ratio < 2 else 2.5

    # Operating Cash Flow
    if metrics["Net Cash from Operating Activities"] > 0:
        score += 10

    # Investing Cash Flow
    if metrics["Net Cash from Investing Activities"] < 0:
        score += 5

    # Cash at End of Period
    if metrics["Cash at End of Period"] > 0:
        score += 5

    # Total Assets and Liabilities + Equity comparison
    if metrics["Total Assets"] and metrics["Liabilities + Equity"]:
        diff = abs(metrics["Total Assets"] - metrics["Liabilities + Equity"])
        if diff / metrics["Total Assets"] < 0.05:
            score += 5

    normalized_score = round(score, 2)  # Score should not exceed 50
    return normalized_score