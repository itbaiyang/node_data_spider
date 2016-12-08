var $ = require('jquery')
var md5 = require('md5')
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var config = require('./config')
user = config[0];
token = config[1];
api_url = 'https://data.api.zhironghao.com/query/'
var url = 'mongodb://localhost:27017/spider_02';

MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
  	md5_data();
    findDocuments(db, function() {
      db.close();
    });
});
var findDocuments = function(db, callback) {
	var collection = db.collection('job');
	collection.find({}).limit(3).toArray(function(err, docs) {
        docs.forEach(function(doc){
        	console.log(doc)
        	push_data()
        })
        db.close();
    });
}
var md5_data = function () {
    var time = new Date();
    var timestamp = time.getTime();
    console.log(time.getTime());
    var data = user + timestamp + token;
    var id_md5 = md5(data);
    console.log(id_md5);
    var data_md5 = {
    	"time_stamp": timestamp,
    	"time_md5":id_md5
    } 
    console.log(data_md5)
    return data_md5
}

var push_data = function(url, data){
	var data = md5_data()
	var m_params = {
		u:user,
		t:data.timestamp,
		k:data.id_md5
    };
    console.log(m_params)
    // $.ajax({
    //     type: 'POST',
    //     url: api_url + "job",
    //     data: m_params,
    //     traditional: true,
    //     success: function (data, textStatus, jqXHR) {
    //         if (data.returnCode == 0) {
    //         }
    //         else {
    //         }
    //     },
    //     dataType: 'json'
    // });
}