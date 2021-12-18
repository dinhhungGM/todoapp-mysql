// express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require("./routes/index")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
