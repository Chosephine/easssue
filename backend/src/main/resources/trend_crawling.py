from bs4 import BeautifulSoup
import requests
import json
import warnings

warnings.filterwarnings("ignore", category=UserWarning, module='bs4')

url = 'https://www.nate.com/js/data/jsonLiveKeywordDataV1.js?v=202211150050'
response = requests.get(url)

soup = BeautifulSoup(response.text,"lxml", from_encoding="cp949")
k = soup.p.string
x = json.loads(k)
for i in range(10):
    print(x[i][0],";",x[i][1])