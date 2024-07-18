import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import addSchool from "./controller/addSchool.js";
import viewSchools from "./controller/viewSchools.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.port || 3000;

const imgDir = path.join(process.cwd(), "schoolImages");

// Use custom filename and directory for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgDir);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = uuid();
    cb(null, uniquePrefix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/image", express.static(imgDir));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/add-school", upload.single("image"), addSchool);

app.get("/view-schools", viewSchools);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
