const express = require("express")
const app = express()
const logos = require('./logos')

const PORT = 3001
const HOST = "localhost"

app.use(express.json())

app.post("/logos", (req, res, next) => {
    const {body: {companyName}} = req
    
    if (logos[companyName]) {
        res.send(logos[companyName])
    } else {
        res.status(404).send(null)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})
