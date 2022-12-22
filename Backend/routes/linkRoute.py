from fastapi import APIRouter

from models.linkModel import Link
from models.linkModel import Admin
from config.db import conn
from schemas.link import serializeDict,serializeList
from harvester import Harvester
from utils.hashing import VerifyiPassword
link = APIRouter()


@link.get('/api/links')
async def find_all():
    
    return serializeList(conn.Onion_Repo.Repo.find()) 


@link.get('/api/state')
async def count_all():
   
    return conn.Onion_Repo.Repo.count_documents({}) 



@link.post('/api/new')
async def addnew(link:Link):
    conn.Onion_Repo.submites.insert_one(dict(link))
    return  serializeList(conn.Onion_Repo.Repo.find())


@link.post('/admin/login')
async def login(user:Admin):
    # adminData= serializeList(conn.Onion_Repo.admin.find())
    # userx=dict(adminData[0])['user']
    # password=dict(adminData[0])['password']
    # if(VerifyiPassword(user.password,user.user,password,userx)):
    #     print('Logged in')
    #     return 'you are loged in'
    # else:
    #     print(' not Logged in')
    #     return adminData
    conn.Onion_Repo.submites.deleteMany({})
    return serializeList(conn.Onion_Repo.submites.find()) 
  

   


@link.get('/api/search')
async def search(link:str):
    x = Harvester(link)
    x.harvst()
    return x.result
