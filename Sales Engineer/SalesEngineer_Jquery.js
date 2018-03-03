/*! Contact Form Behaviors */
//

$(document).ready(function () {

//Get the Hubspotutk by name and pass that in the post, this will also get other cookies if they exist, but we arent looking for them by name
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
    //This is a listener to see if the submit btton is clicked, if it is, runs function
    $('button[type="submit"]').click(function (e) {
        // variables for input field values
        var firstname =$('input[type="text"]').val()
        var lastname =$('input[type="text"]').val()
        var email = $('input[type="email"]').val();
        
        // * variables for "SEindex.html" file
            var formURL = $('form').attr('action');

            var hutk = readCookie("hubspotutk"); 

            var pageUrl = location.href; 
            var rawName = document.title; //had to use two steps because of spaces in the title would throw off the string
            var pageName = encodeURI(rawName);

            // * post data to "SEindex.html" file
            var postData = `firstname=${firstname}&lastname=${lastname}&email=${email}&hutk=${hutk}&pageName=${pageName}&pageUrl=${pageUrl}`
            // * ajax form submission handler
            $.ajax({
                type: 'POST',
                url: formURL, //getting form url from the action in the form tag
                data: postData,
                success: function (data, responseText) {
                    // show success message and hide others
                    $('.success').show().delay(2000).fadeOut(300);
                },
                error: function (errorThrown) {
                    console.log(errorThrown);
                }
            });
        
    });
});