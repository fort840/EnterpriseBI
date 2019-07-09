var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var localhostIP = "127.0.0.1";
var faker = require("faker");

var fournisseurs = [];
for (var i = 0; i < 5; i++) {
    var randomName = faker.company.companyName();
    var randomImage = faker.image.business();
    var fournisseur = {nom : randomName, image : randomImage};
    fournisseurs.push(fournisseur);
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/fournisseurs", function(req, res) {
    res.render("fournisseurs", {fournisseurs : fournisseurs});
});

app.post("/fournisseurs", function(req, res) {
    var nom = req.body.nom;
    var image = req.body.image;
    if (nom && image) {
        fournisseurs.push({nom : nom, image : image});
    }
    res.redirect("/fournisseurs");
});

app.get("/fournisseurs/new", function(req, res) {
    res.render("newFournisseur");
})

app.get("*", function(req, res) {
    res.render("nonExistantPage");
});

app.listen(process.env.PORT || 3000, process.env.IP || localhostIP, function() {
    console.log("Server EnterpriseBI is running.");
})
