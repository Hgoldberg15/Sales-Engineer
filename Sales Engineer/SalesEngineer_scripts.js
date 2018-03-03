
//require Node modules that we are calling in, installed through terminal

var https = require('https');
var querystring = require('querystring');

// build the data object to require the parameters in the API, when a post request is received, goes through and says "get" from the request the body of the thing, which is called "firstname"

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

// set up the request that we are going to send to HubSpot, setting up the envelope 
//chunk is breaking up data so you are not crashing the servers

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

// post the data through the function defined above

request.write(postData);
request.end();

