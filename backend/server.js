
const dotenv = require('dotenv')

const connectDataBase = require("./db/Database")
const app = require("./app")

dotenv.config({ path: "backend/.env" })
connectDataBase()



const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})

