module.exports = function (context, myTimer) {
    
    var request = require("request");
    var url = process.env.UrlEinsMan;

    var performGetRequest = function (uriAction, callback) {

        var result = request.get(
            uriAction,
            function (error, response, body) {
                context.log('error:', error); // Print the error if one occurred
                context.log('statusCode:', response.statusCode); // Print the response status code if a response was received #

                if (response.statusCode == 200) {
                    var responseObject = JSON.parse(response.body);
                    var anzahlEinsaetze = responseObject.operations[0].length;
                    var color = "yellow";
                    if(anzahlEinsaetze >100) {
                        color = "red";
                    } else if (anzahlEinsaetze == 0) {
                        color = "green";
                    }

                    context.log('anzahlEinsaetze:', anzahlEinsaetze, ' - color: ', color);
                    var innerResult = request.get(process.env.QueueConnectionString + '&name=' + color);
                }
            }
        );
    };

    performGetRequest(url);

    context.log('JavaScript timer trigger function ran!');   
    
    context.done();  
};