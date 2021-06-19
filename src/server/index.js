import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../client/App";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.get("/*", (req, res) => {
  const reactString = ReactDomServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  fs.readFile(path.resolve(__dirname, "../index.html"), (err, data) => {
    const htmlString = data
      .toString()
      .replace('<div id="root"></div>', `<div id="root">${reactString}</div>`);
    res.send(htmlString);
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
