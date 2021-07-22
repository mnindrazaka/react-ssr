import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../client/App";
import Handlebars from "handlebars";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "../assets")));

app.get("/*", (req, res) => {
  const readableStream = ReactDomServer.renderToNodeStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const htmlBefore = fs
    .readFileSync(path.resolve(__dirname, "views", "before.handlebars"))
    .toString();
  const templateBefore = Handlebars.compile(htmlBefore);

  res.write(templateBefore());

  readableStream.pipe(res, { end: false });

  const htmlAfter = fs
    .readFileSync(path.resolve(__dirname, "views", "after.handlebars"))
    .toString();
  const templateAfter = Handlebars.compile(htmlAfter);

  readableStream.on("end", () => {
    res.end(templateAfter());
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
