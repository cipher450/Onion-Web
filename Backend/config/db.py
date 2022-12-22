from pymongo import MongoClient
from os.path import join, dirname
from dotenv import load_dotenv
import os
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
load_dotenv()
key = os.environ.get("KEY")

connectionstr =key
conn= MongoClient(connectionstr)

