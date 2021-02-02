exports.handler = function (event, context) {
    console.log("YAYAYA", event)
    return { 
       statusCode: 200, 
        body: "Hello World" 
    };
}