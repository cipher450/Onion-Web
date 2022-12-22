import hashlib

def HashPassword(raw:str):
    return hashlib.sha256(raw.encode('utf-8')).hexdigest();


def VerifyiPassword(pwd:str,Submited_user:str,hashed:str,user:str):
    pwd= hashlib.sha256(pwd.encode('utf-8')).hexdigest();
    if(pwd==hashed and Submited_user == user):
        return True
    else:
        return False