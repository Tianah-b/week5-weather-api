import express from "express";
import weatherRoutes from "./routes/weatherRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

// Our new route
app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
