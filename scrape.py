import urllib.requests
import matplotlib.pyplot as plt
from PIL import Image
from io import BytesIO
subscription_key = "b28498cc-3f5e-4390-bca3-b5df6d58abed"
search_url = "https://api.bing.microsoft.com/v7.0/images/search"
search_term = "puppies"

headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

params  = {"q": search_term, "license": "public", "imageType": "photo"}

response = requests.get(search_url, headers=headers, params=params)
response.raise_for_status()
search_results = response.json()
thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:16]]

print(thumbnail_urls)