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
  const readableStream = ReactDomServer.renderToNodeStream(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  fs.readFile(path.resolve(__dirname, "../index.html"), (err, data) => {
    const htmlString = data.toString();
    const splittedHTMLString = htmlString.split('<div id="root"></div>');
    const htmlBefore = splittedHTMLString[0] + '<div id="root">';
    const htmlAfter = "</div>" + splittedHTMLString[1];

    res.write(htmlBefore);

    readableStream.pipe(res, { end: false });

    readableStream.on("end", () => {
      res.end(htmlAfter);
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
