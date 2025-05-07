const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const quoteRouter = require("./routes/quotes");
const favouriteRouter = require("./routes/favourites");
const { jwtAuth } = require("./utils/jwtauth");


const cors = require("cors");
app.use(cors());

app.use(express.json());
// app.use(jwtAuth);
app.use("/users", userRouter);
app.use("/quotes", quoteRouter);
app.use("/favourites", favouriteRouter);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log("server ready at port", port);
});