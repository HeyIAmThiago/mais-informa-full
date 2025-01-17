require("dotenv").config(); // Carrega as variáveis de ambiente do .env

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware para permitir JSON no body das requisições

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

// Endpoint POST para inserir um recado
app.post("/recado", (req, res) => {
  const { autor, recado } = req.body;

  if (!autor || !recado) {
    return res.status(400).json({ error: "Autor e recado são obrigatórios!" });
  }

  const query = "INSERT INTO recado (autor, recado) VALUES (?, ?)";
  db.query(query, [autor, recado], (err, result) => {
    if (err) {
      console.error("Erro ao inserir recado:", err.message);
      return res.status(500).json({ error: "Erro ao inserir recado." });
    }
    res
      .status(201)
      .json({ message: "Recado inserido com sucesso!", id: result.insertId });
  });
});

// Endpoint GET para listar todos os recados
app.get("/recados", (req, res) => {
  const query = "SELECT * FROM recado";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar recados:", err.message);
      return res.status(500).json({ error: "Erro ao buscar recados." });
    }
    res.status(200).json(results);
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
