const auth = require("../controllers/auth");

app.post("/home", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});