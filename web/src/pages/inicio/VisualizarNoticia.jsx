// pages/inicio/VisualizarNoticia.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../constants/api";

function VisualizarNoticia() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Extrai o ID da query string: ?id_news=123
  const searchParams = new URLSearchParams(location.search);
  const id_news = searchParams.get("id_news");

  useEffect(() => {
    if (!id_news) {
      alert("Notícia não especificada.");
      return navigate("/news");
    }

    fetchNews(id_news);
  }, [id_news, navigate]);

  async function fetchNews(id) {
    setLoading(true);
    try {
      const response = await api.get(`/news/${id}`);
      setNews(response.data);
    } catch (error) {
      console.error("Erro ao carregar notícia:", error);
      alert("Notícia não encontrada.");
      navigate("/news");
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      color: "#333",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2c3e50",
      margin: 0,
    },
    backButton: {
      padding: "8px 16px",
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    loading: {
      textAlign: "center",
      padding: "40px",
    },
    spinner: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #007bff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
      margin: "0 auto 10px",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    image: {
      width: "100%",
      height: "300px",
      objectFit: "cover",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    noImage: {
      width: "100%",
      height: "300px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#aaa",
      fontSize: "1.2rem",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    content: {
      fontSize: "1.05rem",
      lineHeight: "1.8",
      color: "#444",
      whiteSpace: "pre-wrap",
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Carregando notícia...</p>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.loading, color: "#dc3545" }}>
          Notícia não encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className="main-content"><div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{news.title}</h2>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Voltar
        </button>
      </div>

      <div style={styles.card}>
        {news.image ? (
          <img
            src={`http://localhost:3001${news.image}`}
            alt={news.title}
            style={styles.image}
          />
        ) : (
          <div style={styles.noImage}>Sem imagem</div>
        )}

        <p style={styles.content}>{news.content}</p>
      </div>
    </div></div>
  );
}

export default VisualizarNoticia;