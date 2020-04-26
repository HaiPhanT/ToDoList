const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let items = ["something"];
let workItems = ["Work item here"];

app.get("/", (req, res) => {
  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    items: items
  });
});

app.post("/", (req, res) => {
  let item = req.body.item;
  if (req.body.list === "Work list") {
    console.log(req.body);
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work list",
    items: workItems
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
