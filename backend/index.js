const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const index = require("./routes/index");

// ------------------------- INSTANTIATE ------------------
const app = express();

// ------------------------- CONFIG -----------------------
const port = 3000;
const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  optionsSuccessStatus: 200,
};

// ------------------------- MIDDLEWARE -------------------
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// ------------------------- PATHS ------------------------
app.use("/v1", index);

// ------------------------- INIT -------------------------
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
