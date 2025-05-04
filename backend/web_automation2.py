# # from playwright.sync_api import sync_playwright
# # import requests
# # import os

# # def scrape_stock_concalls_playwright(stock_name):
# #     # Validate stock name
# #     if not stock_name or not stock_name.isalnum():
# #         print("Error: Invalid stock name. Please provide a valid alphanumeric stock code.")
# #         return
    
# #     # URLs
# #     base_url = "https://www.screener.in"
# #     stock_url = f"https://www.screener.in/company/{stock_name.upper()}/consolidated/"
    
# #     # Start Playwright
# #     with sync_playwright() as p:
# #         browser = p.chromium.launch(headless=True)
# #         page = browser.new_page()
        
# #         page.set_extra_http_headers({
# #             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
# #         })
# #         page.set_viewport_size({"width": 1920, "height": 1080})
        
# #         try:
# #             # Login
# #             print("Navigating to login page...")
# #             page.goto(base_url)
# #             page.wait_for_timeout(2000)
            
# #             print("Finding and clicking the login button...")
# #             login_button = page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[2]/a[1]', timeout=15000)
# #             login_button.click()
            
# #             print("Waiting for login fields...")
# #             email_field = page.wait_for_selector('xpath=/html/body/main/div[2]/div[2]/form/div[1]/input', timeout=15000)
# #             password_field = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/div[2]/input')
            
# #             print("Entering email and password...")
# #             email_field.fill('koget44912@janfab.com')  # Consider using os.getenv('SCREEN_EMAIL')
# #             password_field.fill('automation')          # Consider using os.getenv('SCREEN_PASS')
            
# #             print("Clicking submit button...")
# #             submit_button = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/button')
# #             submit_button.click()
            
# #             print("Waiting for main page after login...")
# #             page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[1]/div/input', timeout=15000)
            
# #             # Navigate to stock page
# #             print(f"Navigating to {stock_name.upper()} consolidated page...")
# #             page.goto(stock_url)
# #             page.wait_for_timeout(3000)
            
# #             # Export to Excel
# #             print("Waiting for Export to Excel button...")
# #             export_button = page.wait_for_selector('xpath=/html/body/main/div[3]/div[1]/form/button/span', timeout=15000)
# #             if export_button:
# #                 print("Clicking Export to Excel button...")
# #                 with page.expect_download() as download_info:
# #                     export_button.click()
# #                 download = download_info.value
# #                 excel_filename = f"{stock_name.upper()}_Export.xlsx"
# #                 download.save_as(excel_filename)
# #                 print(f"Excel file downloaded as {excel_filename}")
# #             else:
# #                 print("Export to Excel button not found.")
            
# #             # Find conference call
# #             print("Locating conference call element...")
# #             concall_element = page.query_selector('xpath=//*[@id="documents"]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')
            
# #             if concall_element:
# #                 concall_text = concall_element.inner_text().strip()
# #                 concall_link = concall_element.get_attribute('href')
# #                 if concall_link and not concall_link.startswith('http'):
# #                     concall_link = "https://www.screener.in" + concall_link
                    
# #                 print("Latest Conference Call Details:")
# #                 print(f"Title: {concall_text}")
# #                 print(f"Link: {concall_link}")
# #                 return download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
# #             else:
# #                 print("Original XPath failed, trying alternative...")
# #                 transcript_button = page.query_selector('xpath=/html/body/main/section[10]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')
# #                 if transcript_button:
# #                     concall_text = transcript_button.inner_text().strip()
# #                     concall_link = transcript_button.get_attribute('href')
# #                     if concall_link and not concall_link.startswith('http'):
# #                         concall_link = "https://www.screener.in" + concall_link
# #                     print("Latest Conference Call Details (via alternative XPath):")
# #                     print(f"Title: {concall_text}")
# #                     print(f"Link: {concall_link}")
# #                     return download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
# #                 else:
# #                     print("Could not find conference call element. Page structure may have changed or stock is invalid.")
# #                     return None
                
# #         except Exception as e:
# #             print(f"An error occurred: {e}")
# #             return None
            
# #         finally:
# #             print("Closing browser...")
# #             browser.close()

# # def download_pdf_with_playwright(page, url, title, stock_name):
# #     """Download the PDF using Playwright or requests with session cookies"""
# #     try:
# #         filename = f"{stock_name.upper()}_{title.replace(' ', '_')}.pdf"
# #         filepath = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads", filename)
# #         os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
# #         with page.expect_download() as download_info:
# #             page.evaluate(f"window.location.href = '{url}'")
# #             page.wait_for_timeout(5000)
# #         download = download_info.value
        
# #         if os.path.exists(filepath):
# #             print(f"Warning: {filepath} already exists, overwriting...")
# #         download.save_as(filepath)
# #         print(f"PDF downloaded as {filepath}")
# #         return filepath
        
# #     except Exception as e:
# #         print(f"Playwright download failed: {e}. Trying requests...")
# #         cookies = page.context.cookies()
# #         session_cookies = {cookie['name']: cookie['value'] for cookie in cookies}
        
# #         try:
# #             response = requests.get(url, headers={
# #                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
# #                 "Referer": f"https://www.screener.in/company/{stock_name.upper()}/consolidated/"
# #             }, cookies=session_cookies)
# #             response.raise_for_status()
            
# #             if os.path.exists(filepath):
# #                 print(f"Warning: {filepath} already exists, overwriting...")
# #             with open(filepath, 'wb') as f:
# #                 f.write(response.content)
# #             print(f"PDF downloaded as {filepath} via requests")
# #             return filepath
# #         except requests.exceptions.RequestException as e:
# #             print(f"Error downloading PDF with requests: {e}")
# #             return None

# # if __name__ == "__main__":
# #     stock_name = input("Enter the stock name (e.g., TCS): ").strip()
# #     file_path = scrape_stock_concalls_playwright(stock_name)
# #     if file_path:
# #         print(f"Successfully downloaded conference call to: {file_path}")
# #     else:
# #         print("Failed to download conference call.")

# from playwright.sync_api import sync_playwright
# import requests
# import os

# def scrape_stock_concalls_playwright(stock_name):
#     # Validate stock name
#     if not stock_name or not stock_name.isalnum():
#         print("Error: Invalid stock name. Please provide a valid alphanumeric stock code.")
#         return

#     base_url = "https://www.screener.in"
#     stock_url = f"{base_url}/company/{stock_name.upper()}/consolidated/"

#     with sync_playwright() as p:
#         browser = p.chromium.launch(headless=True)
#         page = browser.new_page()

#         page.set_extra_http_headers({
#             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
#         })
#         page.set_viewport_size({"width": 1920, "height": 1080})

#         try:
#             # Login
#             print("Navigating to login page...")
#             page.goto(base_url)
#             page.wait_for_timeout(2000)

#             print("Clicking login...")
#             login_button = page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[2]/a[1]', timeout=15000)
#             login_button.click()

#             print("Filling login credentials...")
#             email_field = page.wait_for_selector('xpath=/html/body/main/div[2]/div[2]/form/div[1]/input', timeout=15000)
#             password_field = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/div[2]/input')
#             email_field.fill('koget44912@janfab.com')
#             password_field.fill('automation')

#             submit_button = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/button')
#             submit_button.click()

#             print("Waiting for dashboard after login...")
#             page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[1]/div/input', timeout=15000)

#             print(f"Navigating to stock page: {stock_name.upper()}")
#             page.goto(stock_url)
#             page.wait_for_timeout(3000)

#             # Find conference call
#             print("Locating conference call...")
#             concall_element = page.query_selector('xpath=//*[@id="documents"]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')

#             if concall_element:
#                 concall_text = concall_element.inner_text().strip()
#                 concall_link = concall_element.get_attribute('href')
#                 if concall_link and not concall_link.startswith('http'):
#                     concall_link = base_url + concall_link

#                 print("Conference Call Found:")
#                 print(f"Title: {concall_text}")
#                 print(f"Link: {concall_link}")
#                 download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
#             else:
#                 print("Trying alternative XPath for transcript...")
#                 alt_element = page.query_selector('xpath=/html/body/main/section[10]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')
#                 if alt_element:
#                     concall_text = alt_element.inner_text().strip()
#                     concall_link = alt_element.get_attribute('href')
#                     if concall_link and not concall_link.startswith('http'):
#                         concall_link = base_url + concall_link
#                     print("Conference Call (Alt XPath):")
#                     print(f"Title: {concall_text}")
#                     print(f"Link: {concall_link}")
#                     download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
#                 else:
#                     print("Could not locate any conference call transcripts.")

#         except Exception as e:
#             print(f"An error occurred: {e}")
#         finally:
#             print("Closing browser...")
#             browser.close()

# def download_pdf_with_playwright(page, url, title, stock_name):
#     try:
#         with page.expect_download() as download_info:
#             page.evaluate(f"window.location.href = '{url}'")
#             page.wait_for_timeout(5000)
#         download = download_info.value

#         filename = f"{stock_name.upper()}_{title.replace(' ', '_')}.pdf"
#         if os.path.exists(filename):
#             print(f"Warning: {filename} already exists, overwriting...")
#         download.save_as(filename)
#         print(f"PDF downloaded as {filename}")
#     except Exception as e:
#         print(f"Playwright download failed: {e}. Trying requests...")
#         cookies = page.context.cookies()
#         session_cookies = {cookie['name']: cookie['value'] for cookie in cookies}
#         try:
#             response = requests.get(url, headers={
#                 "User-Agent": "Mozilla/5.0",
#                 "Referer": f"https://www.screener.in/company/{stock_name.upper()}/consolidated/"
#             }, cookies=session_cookies)
#             response.raise_for_status()
#             filename = f"{stock_name.upper()}_{title.replace(' ', '_')}.pdf"
#             if os.path.exists(filename):
#                 print(f"Warning: {filename} already exists, overwriting...")
#             with open(filename, 'wb') as f:
#                 f.write(response.content)
#             print(f"PDF downloaded as {filename} via requests")
#         except requests.exceptions.RequestException as e:
#             print(f"Error downloading PDF with requests: {e}")

# if __name__ == "__main__":
#     stock_name = input("Enter the stock NSE code (e.g., TCS, INFY, HDFC, BAJFINANCE): ").strip()
#     scrape_stock_concalls_playwright(stock_name)
from playwright.sync_api import sync_playwright
import requests
import os

def scrape_stock_concalls_playwright(stock_name):
    # Validate stock name
    if not stock_name or not stock_name.isalnum():
        print("Error: Invalid stock name. Please provide a valid alphanumeric stock code.")
        return

    base_url = "https://www.screener.in"
    stock_url = f"{base_url}/company/{stock_name.upper()}/consolidated/"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.set_extra_http_headers({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        })
        page.set_viewport_size({"width": 1920, "height": 1080})

        try:
            # Login
            print("Navigating to login page...")
            page.goto(base_url)
            page.wait_for_timeout(2000)

            print("Clicking login...")
            login_button = page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[2]/a[1]', timeout=15000)
            login_button.click()

            print("Filling login credentials...")
            email_field = page.wait_for_selector('xpath=/html/body/main/div[2]/div[2]/form/div[1]/input', timeout=15000)
            password_field = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/div[2]/input')
            email_field.fill('koget44912@janfab.com')
            password_field.fill('automation')

            submit_button = page.query_selector('xpath=/html/body/main/div[2]/div[2]/form/button')
            submit_button.click()

            print("Waiting for dashboard after login...")
            page.wait_for_selector('xpath=/html/body/nav/div[2]/div/div/div/div[2]/div[1]/div/input', timeout=15000)

            print(f"Navigating to stock page: {stock_name.upper()}")
            page.goto(stock_url)
            page.wait_for_timeout(3000)

            # Find conference call
            print("Locating conference call...")
            concall_element = page.query_selector('xpath=//*[@id="documents"]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')

            if concall_element:
                concall_text = concall_element.inner_text().strip()
                concall_link = concall_element.get_attribute('href')
                if concall_link and not concall_link.startswith('http'):
                    concall_link = base_url + concall_link

                print("Conference Call Found:")
                print(f"Title: {concall_text}")
                print(f"Link: {concall_link}")
                download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
            else:
                print("Trying alternative XPath for transcript...")
                alt_element = page.query_selector('xpath=/html/body/main/section[10]/div[2]/div[4]/div[2]/ul/li[1]/a[1]')
                if alt_element:
                    concall_text = alt_element.inner_text().strip()
                    concall_link = alt_element.get_attribute('href')
                    if concall_link and not concall_link.startswith('http'):
                        concall_link = base_url + concall_link
                    print("Conference Call (Alt XPath):")
                    print(f"Title: {concall_text}")
                    print(f"Link: {concall_link}")
                    download_pdf_with_playwright(page, concall_link, concall_text, stock_name)
                else:
                    print("Could not locate any conference call transcripts.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            print("Closing browser...")
            browser.close()

def download_pdf_with_playwright(page, url, title, stock_name):
    try:
        with page.expect_download() as download_info:
            page.evaluate(f"window.location.href = '{url}'")
            page.wait_for_timeout(5000)
        download = download_info.value

        filename = f"{stock_name.upper()}_{title.replace(' ', '_')}.pdf"
        if os.path.exists(filename):
            print(f"Warning: {filename} already exists, overwriting...")
        download.save_as(filename)
        print(f"PDF downloaded as {filename}")
    except Exception as e:
        print(f"Playwright download failed: {e}. Trying requests...")
        cookies = page.context.cookies()
        session_cookies = {cookie['name']: cookie['value'] for cookie in cookies}
        try:
            response = requests.get(url, headers={
                "User-Agent": "Mozilla/5.0",
                "Referer": f"https://www.screener.in/company/{stock_name.upper()}/consolidated/"
            }, cookies=session_cookies)
            response.raise_for_status()
            filename = f"{stock_name.upper()}_{title.replace(' ', '_')}.pdf"
            if os.path.exists(filename):
                print(f"Warning: {filename} already exists, overwriting...")
            with open(filename, 'wb') as f:
                f.write(response.content)
            print(f"PDF downloaded as {filename} via requests")
        except requests.exceptions.RequestException as e:
            print(f"Error downloading PDF with requests: {e}")

if __name__ == "__main__":
    stock_name = input("Enter the stock NSE code (e.g., TCS, INFY, HDFC, BAJFINANCE): ").strip()
    scrape_stock_concalls_playwright(stock_name)