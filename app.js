const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const https = require("https");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname+ "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us6.api.mailchimp.com/3.0/lists/ca853e363d';
    const option = {
        method:"POST",
        auth:"Paul343:6788dcc350134429d92e707f95f943d9-us6"
    }
    
    const request = https.request(url, option, function(response){
        if (response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        
        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    console.log(firstName, lastName, email);
})

app.post("/failure", function(req, res){
    res.redirect("/")
}}
app.listen(process.env.PORT || port, function(){
    console.log("dADA");
})

//6788dcc350134429d92e707f95f943d9-us6
//ca853e363d
//https://us6.api.mailchimp.com/3.0/lists/ca853e363d'