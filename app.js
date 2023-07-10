const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems=[];
var item = "";
var i_Daily = 3;
var i_Work=0;
var HomePage=1;
var WorkPage=0;
app.get("/", function (req, res) {
    HomePage=1;
    WorkPage=0;
    var day=date.getDate();
  res.render("list", {
    ListTitle: day,
    newListItem: items,
    counter: i_Daily,
    HomePage: HomePage,
    WorkPage:WorkPage,
  });
  // console.log(day);
});
app.post("/", function (req, res) {
  item = req.body.list_item;
  if (item != "") {
    items.push(item);
    i_Daily++;
  }
  // console.log(req.body);
  // res.render("list",{
  //     newListItem: req.body.list_item
  // });
  res.redirect("/");
});

app.get("/work", function (req, res) {
    HomePage=0;
    WorkPage=1;
    var wOrk="Work";
  res.render("list", {
    ListTitle: wOrk,
    newListItem: workItems,
    counter: i_Work,
    HomePage: HomePage,
    WorkPage: WorkPage,
  });
});
app.post("/work",function(req,res){
  item = req.body.list_item;
  if (item != "") {
    workItems.push(item);
    i_Work++;
  }
   res.redirect("/work");
})
 app.get("/about",function(req,res){
  res.render("about");
 })
app.listen(3000, function () {
  console.log("Server Started on Port 3000.....");
});
