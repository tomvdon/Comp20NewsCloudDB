NewsAPI = require('newsapi');
newsapi = new NewsAPI('4b239ae1768447238e344103c9ad3ade');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://demouser:jXJI9IZj9T0NtqvB@democlusterwittich-d4afp.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(url, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
	console.log('Connected...');
	const collection = client.db("TEST").collection("news-test");
	var article;
  newsapi.v2.topHeadlines({
  	 //from: '2019-11-23',
  	 //to: '2019-11-23',
 	 //language: 'en',
 	 //domain: 'nytimes.com'
 	  language: 'en',
      country: 'us'
}).then(function(news_returned){
	console.log(news_returned);
	articles=news_returned['articles'];
	console.log("here")
	console.log(articles);
	collection.insertMany(articles ,function(err, result) {
    if(err)
    	console.log(err);
  });
	client.close();
}).catch(function(error){
	console.log(error);
	})
});