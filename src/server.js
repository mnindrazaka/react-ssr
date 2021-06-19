import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDomServer from "react-dom/server";
import App from "./App";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.get("/", (req, res) => {
  const reactString = ReactDomServer.renderToString(<App />);
  fs.readFile(path.resolve(__dirname, "../index.html"), (err, data) => {
    const htmlString = data.toString();
    const replacedHtmlString = htmlString.replace(
      '<div id="root"></div>',
      `<div id="root">${reactString}</div>`
    );
    res.send(replacedHtmlString);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
