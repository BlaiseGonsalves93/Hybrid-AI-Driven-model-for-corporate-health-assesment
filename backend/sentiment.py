# # 📦 Required installations (install via terminal if not already done):
# # pip install GoogleNews textblob newspaper3k lxml
# # python -m textblob.download_corpora

# from GoogleNews import GoogleNews
# from textblob import TextBlob
# from newspaper import Article
# import datetime
# import re

# # 🔧 Utility to clean Google News links
# def clean_link(url):
#     return re.split(r'&ved=|&amp;ved=', url)[0]

# # 🔍 Fetch recent news articles
# def get_news(company_name, num_articles=5):
#     googlenews = GoogleNews(lang='en')
#     googlenews.set_time_range(
#         (datetime.date.today() - datetime.timedelta(days=7)).strftime('%m/%d/%Y'),
#         datetime.date.today().strftime('%m/%d/%Y')
#     )
#     googlenews.search(company_name)
#     news = googlenews.results(sort=True)

#     seen_titles = set()
#     filtered = []
#     for article in news:
#         if article['title'] not in seen_titles and article['link']:
#             seen_titles.add(article['title'])
#             article['link'] = clean_link(article['link'])
#             filtered.append(article)
#         if len(filtered) >= num_articles:
#             break
#     return filtered

# # 📈 Analyze sentiment of article text
# def analyze_sentiment(text):
#     analysis = TextBlob(text)
#     polarity = analysis.sentiment.polarity
#     if polarity > 0.1:
#         return 'Positive'
#     elif polarity < -0.1:
#         return 'Negative'
#     else:
#         return 'Neutral'

# # 🧠 Complete sentiment analysis workflow
# def sentiment_score(company_name, num_articles=5, verbose=True):
#     news_list = get_news(company_name, num_articles=num_articles)
#     score = 0
#     valid_articles = 0

#     if verbose:
#         print(f"\n📰 Sentiment Analysis for recent news on '{company_name}':\n")

#     for idx, item in enumerate(news_list, 1):
#         try:
#             article = Article(item['link'])
#             article.download()
#             article.parse()
#             sentiment = analyze_sentiment(article.text)

#             if sentiment == 'Positive':
#                 score += 1
#             elif sentiment == 'Negative':
#                 score -= 1

#             valid_articles += 1

#             if verbose:
#                 print(f"{idx}. {item['title']}\n   Sentiment: {sentiment}\n   Link: {item['link']}\n")

#         except Exception as e:
#             if verbose:
#                 print(f"{idx}. Could not analyze article: {item['title']}\n   Reason: {e}\n")

#     if valid_articles == 0:
#         return 50  # Neutral default

#     normalized_score = round(((score + valid_articles) / (2 * valid_articles)) * 100)
#     return normalized_score

# # 🚀 Run the module
# if __name__ == "__main__":
#     company = input("🏢 Enter company name: ")
#     score = sentiment_score(company)
#     weighted = round(score * 0.20, 2)

#     print(f"\n📊 Raw Sentiment Score (0–100): {score}")
#     print(f"✅ Weighted Contribution (20%): {weighted}")

# 📦 Required installations (install via terminal if not already done):
# pip install GoogleNews textblob newspaper3k lxml
# python -m textblob.download_corpora

from GoogleNews import GoogleNews
from textblob import TextBlob
from newspaper import Article
import datetime
import re

# 🔧 Utility to clean Google News links
def clean_link(url):
    return re.split(r'&ved=|&amp;ved=', url)[0]

# 🔍 Fetch recent news articles
def get_news(company_name, num_articles=10):  # Changed to 10
    googlenews = GoogleNews(lang='en')
    googlenews.set_time_range(
        (datetime.date.today() - datetime.timedelta(days=7)).strftime('%m/%d/%Y'),
        datetime.date.today().strftime('%m/%d/%Y')
    )
    googlenews.search(company_name)
    news = googlenews.results(sort=True)

    seen_titles = set()
    filtered = []
    for article in news:
        if article['title'] not in seen_titles and article['link']:
            seen_titles.add(article['title'])
            article['link'] = clean_link(article['link'])
            filtered.append(article)
        if len(filtered) >= num_articles:
            break
    return filtered

# 📈 Analyze sentiment of article text
def analyze_sentiment(text):
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    if polarity > 0.1:
        return 'Positive'
    elif polarity < -0.1:
        return 'Negative'
    else:
        return 'Neutral'

# 🧠 Complete sentiment analysis workflow
def sentiment_score(company_name, num_articles=10, verbose=True):  # Changed to 10
    news_list = get_news(company_name, num_articles=num_articles)
    score = 0
    valid_articles = 0

    if verbose:
        print(f"\n📰 Sentiment Analysis for recent news on '{company_name}':\n")

    for idx, item in enumerate(news_list, 1):
        try:
            article = Article(item['link'])
            article.download()
            article.parse()
            sentiment = analyze_sentiment(article.text)

            if sentiment == 'Positive':
                score += 1
            elif sentiment == 'Negative':
                score -= 1

            valid_articles += 1

            if verbose:
                print(f"{idx}. {item['title']}\n   Sentiment: {sentiment}\n   Link: {item['link']}\n")

        except Exception as e:
            if verbose:
                print(f"{idx}. Could not analyze article: {item['title']}\n   Reason: {e}\n")

    if valid_articles == 0:
        return 50  # Neutral default

    normalized_score = round(((score + valid_articles) / (2 * valid_articles)) * 100)
    return normalized_score

# 🚀 Run the module
if __name__ == "__main__":
    company = input("🏢 Enter company name: ")
    score = sentiment_score(company)
    weighted = round(score * 0.20, 2)

    print(f"\n📊 Raw Sentiment Score (0–100): {score}")
    print(f"✅ Weighted Contribution (20%): {weighted}")