const express = require("Express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const uri = process.env.MY_URI;
const port = process.env.PORT;

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((e) => {
  global.db = e;
  myDb = e;
});

app.get("/", (req, res) =>
  res.send("This message is to inform that server started successfully")
);

app.get("/details", async (req, res) => {
  const data = await myDb.db("navedTodo").collection("todo").find().toArray();
  res.send(data);
});

app.post("/add", async (req, res) => {
  const { task } = req.body;
  console.log(task);
  const db = myDb.db("navedTodo").collection("todo");
  await db.insertOne({task });
  res.send(`You added a task : ${task}`);
});

app.delete("/del", async (req, res) => {
  const { _id } = req.body;
  const db = myDb.db("navedTodo").collection("todo");
  // const result = await db.deleteOne({ _id : _id});
  const result = await db.deleteOne({ "_id": ObjectId(_id)});
  // console.log(result);
  res.send("You deleted a data");
});

app.patch("/edit", async (req, res) => {
  const { _id, task } = req.body;
  const db = myDb.db("navedTodo").collection("todo");
  const result = await db.updateOne({ "_id": ObjectId(_id)}, { "$set" : { "task" : task }});
  // console.log(result);
  res.send("You edited a data");
});

app.listen(port, () => console.log("Server started"));
