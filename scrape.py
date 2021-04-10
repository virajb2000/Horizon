import requests
subscription_key = "9b6f4a0de7b8412797a9e9b8a4176c1a"
search_url = "https://api.bing.microsoft.com/v7.0/images/search"
search_term = "World War One"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

params  = {"q": search_term, "license": "public", "imageType": "photo"}

response = requests.get(search_url, headers=headers, params=params)
response.raise_for_status()
search_results = response.json()
thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:16]]

print(thumbnail_urls)