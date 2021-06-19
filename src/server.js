import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
