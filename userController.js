//we are required to first import the model

const user = require("../models/twitschema");
const model = require("../models/twitschema");
const currentDate = new Date();


//establishing connection with the database
const mongoose = require('mongoose');

//establishing conection with mongodb database.
//And using the connection mongoose.connection object to listen for connections with the database.
mongoose.connect('mongodb://localhost/clopedia', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => { console.log("connection established") }).on('error', (error) => { console.log(`an error occurred`) });

//connecting to the twitter api
const auth = require('./authentication');
const Twit = require('twit');
const T = Twit(auth);



//note in this application am using the api reference index of twitter api version 2.
//should dispay the index page.
var index = function(req, res, next) {
    res.send("this is the index of the page..should show basic operations of the application.");
}

// var getallusers = function(req, res, next) {
//     user.find((err, data) => {
//         if (err) {
//             console.log("an error occurred::")
//             console.log(err);
//         } else {
//             res.send(data);
//         }
//     });
// }
var getallusers = function() {
    user.data_.find({}, (err, data) => {
        if (err) {
            console.log("an error occurred::")
            console.log(err);
        } else {

            if (data.length == 0) {
                console.log("Sorry The Collection Is Empty")
            } else {

                console.log(data[0]);

            }

        }
    });
}


//this returns a list of tweets
var querytweets = function(req, res, next) {
    T.get('search/tweets', { q: req.params.query, count: req.params.count }, (err, data, response) => {
        if (err) {
            console.log(`An error has occured:+>:${err}`)
            res.send(err);
        } else {
            console.log(response);
            res.send(data);
        }

    })

}



//query data about a given user a user id should be provided, expected to return an object corresponding to user profile data.

var queryUser = function(req, res, next) {
    //getting information about a given user
    userId = req.params.userId;
    T.get('users/show', { user_id: userId }, (err, data, response) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
}



var list_user_followers = function(req, res, next) {


    screenName = req.params.screenName;

    T.get('followers/ids', { screen_name: screenName }, function(err, data, response) {

        res.send(data);
    })
}



//controller to post a status update.

var postStatus = function(req, res, next) {
    res.send("this is a controller to post status updates.");

}

function getTrends() {


    //require to get whats trending in an interval of an hour.

    T.get('trends/place', { id: '23424863' }, (err, data) => {
        if (err) {
            console.log("An error has occurred" + err);
        } else {

            console.log(data[0]["trends"][0]);


            //for the first  entity of the array of top 50 trending topics do the following.

            var Trends = model.trend({
                "Name_of_Trend": data[0]["trends"][0]["name"],
                "Query": data[0]["trends"][0]["query"],
                "TweetVolume": data[0]["trends"][0]["tweet_volume"],
                "Time": currentDate.getTime(),

            });


            //Saving the trends object in the mongodb cluster database.
            Trends.save((err) => {
                if (err) {
                    console.log("An error occurred \n" + err);
                }
                //beep upon saving the data to the database.
                else {
                    console.log("\u0007");

                }

            })


        }
    });
}


var getHourlyTrends = function() {

    console.log("........tik..tok..tik..tok..tok..tik.......");


    console.log(`..........Executing.. at=> ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}........`);
    setInterval(getTrends, 1800 * 1000);
    console.log("...............................");




}

getallusers()


module.exports = { postStatus, queryUser, querytweets, index, list_user_followers, getallusers, getHourlyTrends };