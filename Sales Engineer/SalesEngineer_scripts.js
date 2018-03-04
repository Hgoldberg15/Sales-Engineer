
/////////Create the server with Express/////////
    //using the variable express to access the elements in that module//
const express = require('express');
const app = express();
var https = require('https');
var querystring = require('querystring');
var cookieParser = require('cookie-parser')
	app.use(cookieParser());
var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
    //first paramter is the location parameter, then the callback when client requests this route//
// app.get('/', (req, res) => res.send('Hello World! This is my server!'));


//////////Node.js that will run on the server///////////

//require Node modules that we are calling in, installed through terminal
app.post('/myaction NEED TO ALTER HTML', function(req, res){

put da shit here
)

// build the data object to require the parameters in the API, when a post request is received, goes through and says "get" from the request the body of the thing, which is called "firstname"

var postData = querystring.stringify({
    'email': request.body.email,
    'firstname': request.body.firstname,
    'lastname': request.body.lastname,
    'hs_context': JSON.stringify({
        "hutk": request.cookies.hubspotutk,
        "ipAddress": request.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "pageUrl": request.body.pageUrl,
        "pageName": request.body.pageName,
    })
});

// set the post options, changing out the HUB ID and FORM GUID variables. This is what kind
//of API call is made and where it is made to. So in this case, what form in what portal. Put in my hubid and the form id. 

var options = {
	hostname: 'forms.hubspot.com',
	path: '/uploads/form/v2/2548141/a07edc3e-97b9-4f66-8e6e-4cdfcaaef1bc',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	}
}

// // set up the request that we are going to send to HubSpot, setting up the envelope 
// //chunk is breaking up data so you are not crashing the servers

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

// // post the data through the function defined above

request.write(postData);
request.end();

app.listen(3000, () => console.log('Example app listening on port 3000!'));