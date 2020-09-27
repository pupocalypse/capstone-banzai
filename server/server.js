const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

const clansRoute = require("./routes/clans.js");
const schoolsRoute = require("./routes/schools.js");
const skillsRoute = require("./routes/skills.js");
const charactersRoute = require("./routes/characters.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Banzai's server!");
});

app.use("/clans", clansRoute);
app.use("/schools", schoolsRoute);
app.use("/skills", skillsRoute);
app.use("/characters", charactersRoute);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
