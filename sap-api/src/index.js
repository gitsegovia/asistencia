import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

//CONFIG
const PORT = process.env.PORT || 3000;

//Routes
import Routes from "./routes";

//Init sequelize
import models from "./models";

//Running Express Server
const app = express();

//Public static
app.use(express.static(path.join(__dirname, "../public")));

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: true }));

//Routes
app.get("/testing", (req, res) => {
  res.json("hola mundo");
});

app.use(Routes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

//TODO ruta creacion providers

console.log("port: ", PORT);

//Running Server sequelize config
const alter = false;
const force = false;

models.sequelize.sync({ alter, force }).then(() => {
  app.listen(PORT, function () {
    console.log("Running!!! Port: ", PORT);
  });
});
