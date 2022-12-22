# (not sure) you could use a string generator to harvest as many links as possible from the ahmia
#  search engine
# How is this better than ahmia ? this is better because it does not offre a link if its DEAD
# test

# 1-Download the page
# 2-Test if the link is alive
# 3-Extract the information that we need Aka {title,link,description,status}
# 4-Filter out the result then send it to the user
# 5-Add the fetched links to our database ??
# -
# -
from bs4 import BeautifulSoup
from urllib.request import urlopen
import urllib.parse
import json
class Harvester:
    



    def __init__(self, keyword, result='',error=''):
        self.keyword = keyword
        self.result = result

    def __str__(self):
        return self.result

    def harvst(self):
        self.keyword = urllib.parse.quote(self.keyword)
        with urlopen('https://ahmia.fi/search/?q=' + self.keyword) as webpage:
            rawResaults = webpage.read().decode()

# Parsing the webpage to html using BeautifulSoup
    
        parsed_html = BeautifulSoup(rawResaults, features="lxml")

# Looping through the 'result' to get the information that we need
        serialized_json = ""

# TODO : PUT every thing that is in the loop to the function above function must retrun a json string
        i = 0
        dictz = []

        for res in parsed_html.body.find_all_next('li', attrs={'class': 'result'}):
            i = i + 1
        #id = uuid.uuid4()
            titel = str(res.find('a').text)
            description = str(res.find('p').text)
            description = description.strip()
            description = description.replace("<p>","")
            description = description.replace("<p/>","")
            description = description.replace("<br>","")
            link = str(res.find('cite').text)
            lastCheckd = str(res.find('span').text)


            dictz.append({
                "_id": "link"+str(i),
                "titel": titel.strip(),
                "description": (description[:75] + '..') if len(description) > 75 else description ,
                "link": link.strip(),
                "lastCheckd": lastCheckd.strip(),
                "status": "offline"
            })
      
        self.result = dictz


    
