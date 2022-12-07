const http= require('http');

const port=8085;

const toDoList=["Complete Node task","Play Chess"];
http
    .createServer((request,response) => {
   
    
        const{ method, url }=request; // destructoring from the request
   

        if(url==="/todos") {
            if(method==="GET")
            {
                response.writeHead(200, {"Content-Type": "text/html"}); // means sending the successful response
                response.write(toDoList.toString());  // converting the array in string as array won't be visible in string format
            }
            else if(method==="POST")
            {
                let body="";
                // 'error' ==> means while making the request we are  getting some error then we come in the error stage
                request.on ("error",(err)=>{        // when we are sending the request then, there are different stages of the request like so with the help of that 'on' we can target different stages in the request
                    console.log(err);
                })  // .on means when the request is made if it is a POST request then 'on' the request do so and so and we can write  multiple on's

                // to send the data faster data is divided into the chunks and we're sending the stream of data and when the srever recevies the data, firstly chunks are getting added 
                .on("data",(chunk) => {
                    body+=chunk;
                    // chunk are not in the JSON format, that's in the bit 
                    // data which we are getting is also not in the form of string but it's the bit stream
                    console.log(chunk);
                })
                // after the 'data' stage we're having the 'end' stage. This stage will let us know that data transfer has done or data has been transferred successfully 
                .on("end",() => {
                    body=JSON.parse(body); // for converting back to the JSON format
                    console.log("data: ",body);
                })
            }
            else{
                response.writeHead(404);  // getting the error
            }
        }
        else{
            response.writeHead(404); 
        }
        response.end();

    })
    .listen(port,() =>{
        console.log(`Node.js server started on port ${port}`);
    });


// http://localhost:8081

