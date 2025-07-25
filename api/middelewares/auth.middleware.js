import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo";

export default function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.id_user = decoded.id_user; // você poderá usar isso no controller
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado, faça login novamente ou peça autorização para acessar." });
  }
}
