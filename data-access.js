var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = 'goodsmanager';

// Create a new MongoClient
const client = new MongoClient(url);


var dao = {
    userCollName: "user",
    productCollName: "product",
    find: function (collectionName,json ,callback) {
        //req.body ={ username: 'admin', password: '123456' }

        //1.获取数据

        var db = client.db(dbName);
        //查询数据  {"username":req.body.username,"password":req.body.password}
        db.collection(collectionName).find(json, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }

            //另一种遍历数据的方法
            result.toArray(function (err, data) {
                callback && callback(err, data);
            });
        });
    },
    //增加数据
    insertOne : function (collectionName, json, callback) {

            var db = client.db(dbName);
            db.collection(collectionName).insertOne(json, function (error, data) {

                callback(error, data);
            })

    },

    //增加数据
    updateOne : function (collectionName, json1, json2, callback) {

            var db = client.db(dbName);
            db.collection(collectionName).updateOne(json1, {
                $set: json2
            }, function (error, data) {

                callback(error, data);
            })

    },

    //删除数据
    deleteOne : function (collectionName, json, callback) {
            var db = client.db(dbName);
            db.collection(collectionName).deleteOne(json, function (error, data) {
                callback(error, data);
            })

    }
}

var database = {
        connect: function (server) {
            client.connect(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    server.start()
                    console.log("Listening on port 3000");
                }
            });
        },
}
exports.DAO = dao

exports.database = database

exports.ObjectID = ObjectID;