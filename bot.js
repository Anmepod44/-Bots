console.log('starting up the bot...');
var tweet=require('twit');


var config=require('./config');//this is user authentication
//difference between user authentication and application authentication is that 

 //method prints json object as a string
var T=new tweet(config);//calling the constructor and passing the authentication information for uor application to access our account.


  T.get('search/tweets',{ q:'#donaldtrump',count:2},function(err,data,response){
  	console.log(data);
  	
  })


// var tweet={
// 	status:"online exams are a scam #onlineExamsKenya"
// }
//  T.post('statuses/update',tweet,function(err,data,response){
//  	if(err){
//  		console.log("Something went wrong");
//  		console.log(err.message);


//  	}

//  	else{
//  		console.log("It went ok");
//  		console.log(data);

//  		var my_data=data.user;

//  		console.log(my_data.screen_name);
//  		console.log(my_data.follow_request_sent);

 	 
//  }
 

//  });