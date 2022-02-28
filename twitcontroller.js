const Twit = require('twit');
const auth = require('./authentication')
const mongoose = require('mongoose');
const app = require('express')();
const port = process.env.PORT || 3000;
//importing the application routes


//importing the models from the models folder in the twitschema module
const { data_, mentions } = require('../models/twitschema');




//saved in the clopedia database..collection?? lets wait and see.
mongoose.connect('mongodb://localhost/clopedia', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("a connection established successfully")
}).on('error', () => {
    console.log(`An error has occurred `);
});



//creating the twit object.
const T = Twit(auth);


app.get("tweet/:count/:save", (req, res) => {

    T.get("search/tweets", { q: "#Ruto", count: req.params.count }, (err, data, response) => {







        for (var i of data.statuses) {
            if (i.geo) {
                console.log(
                    i.geo.toString() + "\u0007" + "here............."
                );;
            }
            //populating my schema with the data about the model.

            var _mentions = []

            //each tweet has a user mention... loop through the mentions and save the ids in an array.



            var data = { user_id: i.user.id_str, name: i.user.screen_name, location: i.user.location, url: i.user.url, description: i.user.description, mentions: [] }
            for (j of i.entities.user_mentions) {
                //looping through the user mentions array of the entities object:

                //pushing the id of the mentions into the array.
                console.log(data.mentions.push(j.id));

            }








            //created an instance of the model.
            var user_data = new data_(data);
            if (user_data.mentions.length > 0) {
                console.log("set")
            }

            console.log("...............user data................");
            console.log(user_data.name);
            console.log(user_data.description);
            console.log(user_data.location);


            console.log(user_data.mentions);
            console.log("........................................");






            //saving the data to connected mongodb database.
            if (req.params.save === "true") {
                user_data.save().then(() => {
                    console.log("\u0007")

                }).catch((error) => {
                    console.log("An error has occurred")
                });

            }
            arr_data.push(user_data);

        }



        res.send(arr_data);

        //this ends and array of the data to the template for processing
        //pot in other words it sends an array of json objects to the front end for processing.

    });


})





// app.set('title', 'Twitter Router');

// //below route handler allows you to get data from the twitter API by passing the query to search for and the count thats the number of objects to return.
// //route gets it and saves it to
// app.get("/apiv1/search/:count/:query/:save", (req, res) => {

//     //required to pass the object count as well as th the query to search for.
//     arr_data = []



//     T.get("search/tweets", { q: req.params.query, count: req.params.count }, (err, data, response) => {







//         for (var i of data.statuses) {
//             if (i.geo) {
//                 console.log(
//                     i.geo.toString() + "\u0007" + "here............."
//                 );;
//             }
//             //populating my schema with the data about the model.

//             var _mentions = []

//             //each tweet has a user mention... loop through the mentions and save the ids in an array.



//             var data = { user_id: i.user.id_str, name: i.user.screen_name, location: i.user.location, url: i.user.url, description: i.user.description, mentions: [] }
//             for (j of i.entities.user_mentions) {
//                 //looping through the user mentions array of the entities object:

//                 //pushing the id of the mentions into the array.
//                 console.log(data.mentions.push(j.id));

//             }








//             //created an instance of the model.
//             var user_data = new data_(data);
//             if (user_data.mentions.length > 0) {
//                 console.log("set")
//             }

//             console.log("...............user data................");
//             console.log(user_data.name);
//             console.log(user_data.description);
//             console.log(user_data.location);


//             console.log(user_data.mentions);
//             console.log("........................................");






//             //saving the data to connected mongodb database.
//             if (req.params.save === "true") {
//                 user_data.save().then(() => {
//                     console.log("\u0007")

//                 }).catch((error) => {
//                     console.log("An error has occurred")
//                 });

//             }
//             arr_data.push(user_data);

//         }



//         res.send(arr_data);

//         //this ends and array of the data to the template for processing
//         //pot in other words it sends an array of json objects to the front end for processing.

//     });

// });

// //route to find an element from the database and return it to the user

// //role of route below is to find a user from the database using a user id and the mentions of each user.

// app.get("/apiv1/user/search/:id", (req, res) => {
//     var user_id = req.params.id;

//     T.get("/2/users/:id", (err, data, response) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(data);
//     })
// })

//this is the server configuration..listens to port 3000 set in the first rows of this page.
app.listen(port, () => {
    console.log("listening for connections.")
});