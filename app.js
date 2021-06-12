const express = require("express");
// const request = require("request");
const https = require("https");





const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
  
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                        FNAME: firstName,
                        LNAME: lastName
                    }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/7eac6840a8"

    const options = {
        method: "POST",

        auth: "basit:36e0944ff411c85cae3dc01c50707db7-us6"
    }

    
    const request = https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});
app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

//apiKey
// 36e0944ff411c85cae3dc01c50707db7-us6

//list id
// 7eac6840a8