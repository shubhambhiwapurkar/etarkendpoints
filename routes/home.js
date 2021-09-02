const auth = require("../controllers/home");

app.post("/home", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});