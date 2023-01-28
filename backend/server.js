const dotenv = require("dotenv");

const connectDataBase = require("./db/Database");
const app = require("./app");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config({ path: "backend/.env" });
connectDataBase();

app.use(notFound);
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
