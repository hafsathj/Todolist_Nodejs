const http = require('http')

const PORT = 8081

const toDoList = ["hafsa", "xyz Company", "Software Developer"]

http.createServer((req, res) => {

    const { method, url } = req;
    // console.log(method,url)

    if (url.toLowerCase() === '/todos') {
        if (method === 'GET') {
            res.writeHead(200, { "Content-type": "text/html" })
            res.write(toDoList.toString())

        }
        else if (method === 'POST') {
            let body = " "
            req.on('error', (err) => {
                console.error(err)
            }).on('data', (chunk) => {
                body += chunk
            }).on('end', () => {

                body = JSON.parse(body)
                toDoList.push(body.item);
            })
        }else if(method === 'DELETE'){
            let body='';
             req.on('error', (err) => {
                console.error(err)
            }).on('data', (chunk) => {
                body += 'chunk'
                console.log("Chunk",chuck);

            }).on('end', () => {

                body = JSON.parse(body)
                // const index =toDoList.indexOf(body.item);
                // if(index > -1){
                //     toDoList.splice(index,1)
                // }
                let deleteThis =body.item;
                for(let i=0; i<toDoList.length; i++){
                    if(toDoList[i] === deleteThis){
                        toDoList.splice(i,1);
                        break;
                    }
                }
            });

        }
        else {
            res.writeHead(501)
        }
    }
    else {
        res.writeHead(404)
    }
    res.end()


}).listen(PORT, () => {
    console.log(`Todo List Server got Started on http://localhost:${PORT}`)
})