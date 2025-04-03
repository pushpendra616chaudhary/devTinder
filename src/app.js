const express = require("express");

const app = express();

// it works with ac or abc both becous b is optional
app.get("/ab?c", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

// it works with abc,ab, abbb, abbbbbb but not with ac
app.get("/ab+c", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

// it means it should start with ab and end with cd and in between there can be anything eg abcd, abcd, abbbcd, abbbbbbcd
app.get("/ab*cd", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

// it means bc is optional eg abcd, abcd,ad, abbbcd, abbbbbbcd
app.get("/a(bc)?d", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

//
app.get("/a(bc)+d", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

// 'a' letter should be there and after that it can be anything but not 'b' letter, example correct - ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az,its all correct becouse 'a' is there
app.get("/a/", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

// it (.*)means it should start with anything but should end with fly only
app.get("/.*fly$/", (req, res) => {
  res.send({ firstnname: "John", lastname: "Doe" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
