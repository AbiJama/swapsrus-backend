const app = require('./src/app')

const APP_PORT = process.env.port || 4000

app.listen(APP_PORT, ()=>{
    console.log(`App is listening on port ${APP_PORT}`)
})