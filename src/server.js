import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import Sequelize from 'sequelize'

dotenv.config()

const app =express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

 const { PORT,HOST } = process.env;

const sequelize = new  Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect:'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

try {
        app.listen(PORT,()=>{
        console.log(`Server listening on port ${HOST}:${PORT}`)
    
      })
} catch (error) {
    console.log(error.message)
}


 // app.listen(port()=>{
    //     console.log(`Server listening on port ${port}`)
    // })




