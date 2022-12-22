from fastapi import FastAPI
from routes.linkRoute import link
from config.db import conn


app=FastAPI()
 
app.include_router(link)
 

 