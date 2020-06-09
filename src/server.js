const express = require("express")
const server = express()

// configurar pasta public
server.use(express.static("public" ))


//Utilizando template engine nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar rotas
server.get("/", (req, res) => {
    return res.render("index.html" )
})
server.get("/create", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//ligar o server
server.listen(3000)