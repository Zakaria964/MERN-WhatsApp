import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";
import dotenv from "dotenv";
/* -------------------------------------------------------------------------- */
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

/* -------------------------------------------------------------------------- */
//pusher

const pusher = new Pusher({
  appId: "1599870",
  key: "672d03cf3a6cc97de9c1",
  secret: "f5b17a6e9aa6316910a7",
  cluster: "eu",
  useTLS: true,
});

/* -------------------------------------------------------------------------- */
// middleware
app.use(express.json());
app.use(cors());

/* -------------------------------------------------------------------------- */
// MongoDB

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

/* -------------------------------------------------------------------------- */
//Routes

app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
