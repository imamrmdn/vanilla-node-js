const fs = require('fs')

const requestHandler = (req, res) => {
    /*
     * menggabungkan request dari user dan response dari server
     */

    const url = req.url;
    const method = req.method;

    if(url === '/'){
        //
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Send Message</title></head>');
        res.write('<body><form method="POST" action="/message" ><input type="text" name="message" /><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    
    /*
     * redirect request
     */

    if(url === '/message' && method === 'POST'){
        
        const body = [];

        //Buffer
        req.on('data', (chunk) => {
            console.log('its chunk: ', chunk);
            body.push(chunk);
        })

        //execute Data
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1].split('+');
            console.log(...message);
            console.log(message);
            fs.writeFile('message.txt', message, () => {
                
                res.statusCode = 302;
                res.setHeader('Location', '/'); 
                return res.end();    
            });
        })
    }

    //console.log('nodemon restart');

    //
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head></head>');
    res.write('<body><h1>Hi There From Server Node</h1></body>');
    res.write('</html>');
    res.end();
}

module.exports = {
    handler: requestHandler,
    text: 'hardcodetext'
};