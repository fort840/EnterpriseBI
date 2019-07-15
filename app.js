var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var localhostIP = "127.0.0.1";
var faker = require("faker");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/enterprisebi", {useNewUrlParser: true});
console.log("Database enterpriseBI connected");

var fournisseurSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Fournisseur = mongoose.model("Fournisseur", fournisseurSchema);

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/fournisseurs", function(req, res) {
    Fournisseur.find({}, function(err, fournisseurs) {
        if (err) {
            console.log("Erreur : " + err);
        }
        else {
            console.log(fournisseurs);
            res.render("fournisseurs", {fournisseurs : fournisseurs});
        }
    });
});

app.post("/fournisseurs", function(req, res) {
    var nom = req.body.nom;
    var image = req.body.image;
    if (nom && image) {
        Fournisseur.create({
            name: nom,
            image: image
        }, function(err, fournisseur) {
            if (err) {
                console.log("Erreur : " + err);
            }
            else {
                console.log(fournisseur);
            }
        });
    }
    res.redirect("/fournisseurs");
});

app.get("/fournisseurs/new", function(req, res) {
    res.render("newFournisseur");
});

app.get("/departements", function(req, res) {
    res.render("departements", {departements : departements});
});

app.post("/departements", function(req, res) {
    var nom = req.body.nom;
    var image = req.body.image;
    if (nom && image) {
        departements.push({nom : nom, image : image});
    }
    res.redirect("/departements");
});

app.get("/departements/new", function(req, res) {
    res.render("newDepartement");
})

app.get("*", function(req, res) {
    res.render("nonExistantPage");
});

app.listen(process.env.PORT || 3000, process.env.IP || localhostIP, function() {
    console.log("Server EnterpriseBI is running.");
})
