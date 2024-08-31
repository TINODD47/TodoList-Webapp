from pymongo import MongoClient
from flask import Flask, render_template, request
from flask_cors import CORS
import json
from bson import ObjectId

app = Flask(__name__) 
CORS(app)          

# client = MongoClient("localhost", 27017)
client = MongoClient("mongodb+srv://user1:1234@cluster0.xgy0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client.todo

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