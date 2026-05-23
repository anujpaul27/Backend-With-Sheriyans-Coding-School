const app = require('./src/app')
const ConnectDB = require('./src/db/db')


ConnectDB()



app.listen(process.env.PORT, ()=> {
    console.log(`Running server on ${process.env.PORT} port`);
} )