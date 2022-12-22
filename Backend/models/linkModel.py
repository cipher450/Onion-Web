from pydantic import BaseModel


class Link(BaseModel):
    titel:str
    description:str
    link:str
    lastChecked:str
    status:str

class Admin(BaseModel):
    user:str
    password:str