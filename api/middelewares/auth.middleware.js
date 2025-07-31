import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // Pega o header Authorization
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona o usuário decodificado na requisição
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado." });
  }
};

export default authMiddleware;
