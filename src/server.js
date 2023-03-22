import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()

const app =express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const {PORT,HOST}=process.env


try {
    app.listen(PORT,()=>{
        console.log(`Server listening on port ${PORT}`)
    })
} catch (error) {
    console.log(error.message)
}





