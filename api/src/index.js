import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/router.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // para servir imagens estáticas
app.use(express.urlencoded({ extended: true }));
app.use(router); // todas as rotas registradas aqui
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});
