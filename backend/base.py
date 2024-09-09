import os
from pymongo import MongoClient
from flask import Flask, render_template, request
from flask_cors import CORS
import json
from bson import ObjectId
from dotenv import load_dotenv

app = Flask(__name__) 
CORS(app)          

load_dotenv(os.path.join(os.path.dirname(__file__),'config.env'))
url=os.getenv("MONGODB")
client = MongoClient(url)
db = client.todo


@app.route('/add')
def add():
    post={"_id":3,"name":"test2"}
    db.todolist.insert_one(post)
    results=db.todolist.find()
    for result in results:
        print(result)
    return {"data":"add list","severity":"success"}


@app.route('/hello')
def hello_world():
    return {"data":"hello","severity":"success"}

@app.route('/todo',methods=['POST','GET','PUT','DELETE'])
def process_todo():
    try:
        if request.method == "POST":
            data = request.get_json(silent=True) or {}
            db.todolist.insert_one(data)
            response = json.dumps({"message":"Todo Inserted Successfully",
                        "data":{"operation":"success"}, "severity":"success"})
            return response
        elif request.method == "GET":
            data = []
            docs = list(db.todolist.find())
            for doc in docs:
                doc['id'] = str(doc['_id'])
                del doc['_id']
                data.append(doc)
            print(data  )
            response = {"message":"Todolist restored",
                    "severity":"success","data":{"tododata":data}}
            return response
        elif request.method == "PUT":
            data = request.get_json(silent=True) or {}
            docs = list(db.todolist.find())
            print(docs)
            db.todolist.update_one({"_id":ObjectId(data["id"])},{"$set":data})
            response = json.dumps({"message":"Todo Updated Successfully",
                        "data":{"operation":"success"}, "severity":"success"})
            return response
        
        elif request.method == "DELETE":
            data = request.get_json(silent=True) or {}            
            db.todolist.delete_one({"_id":ObjectId(data["id"])})
            response = json.dumps({"message":"Todo Deleted Successfully","severity":"success"})
            return response
        
    except Exception as err:
        response = {"message":"Something went wrong during processing todo","severity":"error","data":{}}
        return response

if __name__ == "__main__":
    app.run(debug=True, port=5001)