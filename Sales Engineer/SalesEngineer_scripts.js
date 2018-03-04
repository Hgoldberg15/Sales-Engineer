
/////////Create the server with Express to make this a server side application/////////
//using the variable express to access the elements in that module// as soon as I hit node, this is going to run. The only thing that wont fire is the code in between until I do something. 
const express = require('express');
const app = express();

var https = require('https');
var querystring = require('querystring');
var cookieParser = require('cookie-parser')
	app.use(cookieParser());
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());   //using body parser to allow the app to expect json
    


//This is the start of the actual function that needs to run in order to accept the req from the client //This is /submit hanging off my 3000
//Post method sends body of a network request
app.post("/submit", function(req, res){

		res.send("ok")
		console.log("console ok")
		console.log(req) //Log the request that is sent so we know it is going to the server

			var postData = querystring.stringify({
				'email': req.body.email,
				'firstname': req.body.firstname,
				'lastname': req.body.lastname,
				'hs_context': JSON.stringify({
					"hutk": req.cookies.hubspotutk,
					"ipAddress": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
					"pageUrl": req.body.pageUrl,
					"pageName": req.body.pageName,
				})
			});
// set the post options, changing out the HUB ID and FORM GUID variables. This is where the server is actually going craft the request that it wants to send to HubSpot

			var options = {
				hostname: 'forms.hubspot.com',
				path: '/uploads/form/v2/2548141/a07edc3e-97b9-4f66-8e6e-4cdfcaaef1bc',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': postData.length
				}
			}

//Here we are configuring the settings of the request, similar to how we configured the settings for our app to use on lines 7-13. So, when you do request.write then the settings are already there.
//"chunk" is breaking up data so you are not crashing the servers

			var request = https.request(options, function(response){
				console.log("Status: " + response.statusCode);
				console.log("Headers: " + JSON.stringify(response.headers)); //whatever hubspot sends back
				response.setEncoding('utf8');
				response.on('data', function(chunk){
					console.log('Body: ' + chunk)
				});
			});

			request.on('error', function(e){
				console.log("Problem with request, you done messed up " + e.message)
			});

// // This is where the magic happens to post the data to HubSpot through the function defined above

			request.write(postData);
			request.end();

	})


app.get("/", function(req, res){
	console.log("Serving the page")
	res.sendFile("/Users/hgoldberg/desktop/projects/Sales Engineer/SEIndex.html")
}) //serving up my html page when I run node in the terminal



//turning on the server on port 3000

app.listen(3000, () => console.log('Example app listening on port 3000!'));