const http = require('http')
const fs = require('fs')
const path = require('path');
const md  = require('markdown-it')();

const directorio = {
    "/": "public/index.html",
    "/clientes": "public/clientes.html",
    "/md": "public/conceptos-de-la-programación.md",
    "404": "public/404.html"
}

const fileTypes = {
    ".html" : "text/html",
    ".md" : "text/html"

}


const server = http.createServer((req, res) => {

    
    const { url } = req;
    console.log("URL: "+url)
    
    
    // obtener el directorio del archivo
    let filePath = directorio[url.toLowerCase()]? directorio[url.toLowerCase()] : directorio[404]
    
    // sacar extension del archivo para manejar distintos tipos
    let fileExtension = path.extname( filePath )

    console.log( fileExtension )

    // leer archivos
    fs.readFile(filePath, (err, file) => {
        if (err) {
            throw err

        } else if(fileExtension === "md"){
            
            const htmlContent = md.render(file);
            res.writeHead(200, { 'Content-Type': fileTypes[fileExtension] })
            res.end(htmlContent) 
            
        } else { 

            res.writeHead(200, { 'Content-Type': fileTypes[fileExtension] })
            res.end(file) 

        }

    })

})

// escuchar en el puerto
const PUERTO = 3000;
server.listen(PUERTO)
console.log(`servidor en puuerto ${PUERTO}`)
