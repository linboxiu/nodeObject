//导入模块
const path=require("path")
const captchapng=require("captchapng")
const MongoClient = require('mongodb').MongoClient;


// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'student_info';

exports.getalldatas=(req,res)=>{

  MongoClient.connect(url, function(err, client) {

    const db = client.db(dbName);
 

    // Get the documents collection
    const collection = db.collection('student_info');

    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      console.log(docs)
      client.close();
    });
  })
}