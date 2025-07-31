// pages/inicio/Noticias.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../constants/api";

function Noticias() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  // ✅ Verifica se está logado
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  async function fetchNews(page = 1) {
    setLoading(true);
    try {
      const response = await api.get("/news", {
        params: { page, limit: itemsPerPage },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const { data, totalPages, currentPage } = response.data;
      setNewsList(data);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (error) {
      console.error("Erro ao carregar notícias:", error);
      alert("Erro ao carregar as notícias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta notícia?")) return;

    try {
      await api.delete(`/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Notícia excluída com sucesso!");
      fetchNews(currentPage);
    } catch (error) {
      console.error("Erro ao excluir:", error);
      if (error.response?.status === 403) {
        alert("Acesso negado. Faça login novamente.");
        navigate("/login");
      } else {
        alert("Erro ao excluir a notícia.");
      }
    }
  }

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2c3e50",
    },
    addButton: {
      padding: "10px 16px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    card: {
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
      display: "flex",
      flexDirection: "column",
    },
    cardHover: {
      transform: "translateY(-4px)",
    },
    image: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
    },
    noImage: {
      width: "100%",
      height: "180px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#aaa",
    },
    cardBody: {
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    cardTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#2c3e50",
      margin: "0 0 10px 0",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    cardContent: {
      fontSize: "0.95rem",
      color: "#555",
      flexGrow: 1,
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      lineHeight: "1.5",
    },
    actions: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
    },
    btnView: {
      padding: "6px 10px",
      backgroundColor: "#17a2b8",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    btnEdit: {
      padding: "6px 10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    btnDelete: {
      padding: "6px 10px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "0.85rem",
      cursor: "pointer",
    },
    spinner: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #007bff",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 1s linear infinite",
      margin: "20px auto",
    },
    alert: {
      padding: "12px",
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
      borderRadius: "8px",
      textAlign: "center",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: "30px",
      listStyle: "none",
      padding: 0,
      gap: "6px",
    },
    pageItem: (isActive) => ({
      borderRadius: "6px",
    }),
    pageLink: (isActive) => ({
      display: "block",
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      color: isActive ? "#fff" : "#007bff",
      backgroundColor: isActive ? "#007bff" : "#fff",
      textDecoration: "none",
      fontWeight: "500",
      minWidth: "40px",
      textAlign: "center",
    }),
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: "center" }}>
          <div style={styles.spinner}></div>
          <p>Carregando notícias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content"><div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notícias</h2>
        {isLoggedIn && (
          <button
            style={styles.addButton}
            onClick={() => navigate("/users/news")}
          >
            Nova Notícia
          </button>
        )}
      </div>

      {newsList.length === 0 ? (
        <div style={styles.alert}>
          {isLoggedIn ? "Nenhuma notícia cadastrada." : "Nenhuma notícia disponível."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {newsList.map((item) => (
            <div
              key={item._id || item.id_news}
              style={styles.card}
              onMouseEnter={(e) => (e.currentTarget.style = { ...styles.card, ...styles.cardHover })}
              onMouseLeave={(e) => (e.currentTarget.style = styles.card)}
            >
              {item.image ? (
                <img
                  src={`http://localhost:3001${item.image}`}
                  alt={item.title}
                  style={styles.image}
                />
              ) : (
                <div style={styles.noImage}>Sem imagem</div>
              )}
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>{item.title}</h5>
                <p style={styles.cardContent}>{item.content}</p>

                <div style={styles.actions}>
                  {/* Botão "Ler mais" para público */}
                  {!isLoggedIn && (
                    <button
                      style={styles.btnView}
                      onClick={() => navigate(`/visualizar?id_news=${item._id || item.id_news}`)}
                    >
                      Ler mais
                    </button>
                  )}

                  {/* Editar/Excluir para logados */}
                  {isLoggedIn && (
                    <>
                      <button
                        style={styles.btnEdit}
                        onClick={() => navigate(`/users/news?edit=${item._id || item.id_news}`)}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        style={styles.btnDelete}
                        onClick={() => handleDelete(item._id || item.id_news)}
                      >
                        🗑️ Excluir
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <nav style={{ marginTop: "40px" }}>
          <ul style={styles.pagination}>
            <li
              style={styles.pageItem(currentPage === 1)}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span
                style={{
                  ...styles.pageLink(false),
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Anterior
              </span>
            </li>
            {getPaginationNumbers().map((page, index) =>
              page === "..." ? (
                <li key={`dot-${index}`} style={{ margin: "0 4px" }}>
                  <span style={{ padding: "8px 12px", color: "#aaa" }}>...</span>
                </li>
              ) : (
                <li key={page} style={styles.pageItem(page === currentPage)}>
                  <button
                    onClick={() => handlePageChange(page)}
                    style={styles.pageLink(page === currentPage)}
                  >
                    {page}
                  </button>
                </li>
              )
            )}
            <li
              style={styles.pageItem(currentPage === totalPages)}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span
                style={{
                  ...styles.pageLink(false),
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Próximo
              </span>
            </li>
          </ul>
        </nav>
      )}

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div></div>
  );

  // Funções auxiliares
  function getPaginationNumbers() {
    const pages = [];
    const maxButtons = 5;
    const safeTotalPages = totalPages || 1;
    const safeCurrentPage = currentPage || 1;

    if (safeTotalPages <= maxButtons) {
      for (let i = 1; i <= safeTotalPages; i++) pages.push(i);
    } else {
      if (safeCurrentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", safeTotalPages);
      } else if (safeCurrentPage >= safeTotalPages - 2) {
        pages.push(1, "...", safeTotalPages - 3, safeTotalPages - 2, safeTotalPages - 1, safeTotalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", safeTotalPages);
      }
    }
    return pages;
  }

  function handlePageChange(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }
}

export default Noticias;