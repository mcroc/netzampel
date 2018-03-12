module.exports = function (context, myTimer) {
    var request = require("request");
    var url = process.env.UrlApi;
    var username = process.env.LoginUsername;
    var password = process.env.LoginPassword;
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    var token = '';

    var performGetRequest = function (uriAction, callback) {

        var result = request.get(
            uriAction,
            { headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
                } 
            },
            function (error, response, body) {
                context.log('error:', error); // Print the error if one occurred
                context.log('statusCode:', response.statusCode); // Print the response status code if a response was received #

                if (response.statusCode == 200) {
                    //context.log(body);
                    var valueCount = 0;
                    var responseObject = JSON.parse(body);
                    responseObject.data.forEach(device => {
                        if(device.value === 1) {
                            //context.log(device);
                            valueCount++;
                        }
                    });

                    var color = "green";
                    if (valueCount === 1) {
                        color = "yellow";
                    } else if (valueCount > 1) {
                        color = "red";
                    }
                    var innerResult = request.get(process.env.QueueConnectionString + '&name=' + color);
                }
            }
        );
    };

    request({
        url: url + '/login',
        method: "POST",
        json: {
                'username': username,
                'password': password
            }
        
    }, function (error, response, body) {
        // do something to response 
        context.log('pur login error:', error); // Print the error if one occurred
        context.log('pur login statusCode:', response.statusCode);
        token = body.data.token;
        
        performGetRequest(url + "/Device/list");
    });


    context.log('JavaScript timer trigger function ran!');   
    
    context.done();
};