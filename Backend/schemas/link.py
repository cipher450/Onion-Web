def serializeDict(item) -> dict:
    return {
        "id":str(item["_id"]),
        "v":item["__v"],
        "titel":item["titel"],
        "description":item["description"],
        "link":item["link"],
        "lastCheckd":item["lastCheckd"],
        "status":item["status"]
    }

def serializeList(entity) -> list:
    return [serializeDict(item) for item in entity]


def serializeDict(a) -> dict:
    return {**{i:str(a[i]) for i in a if i=='_id'},**{i:a[i] for i in a if i!='_id'}}

def serializeList(entity) -> list:
    return [serializeDict(a) for a in entity]