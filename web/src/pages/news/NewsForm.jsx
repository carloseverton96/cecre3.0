import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../constants/api";

function NewsForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Verifica se estamos editando uma notícia existente
  const isEditing = location.search.includes("edit=");
  const newsId = new URLSearchParams(location.search).get("edit");

  useEffect(() => {
    if (isEditing && newsId) {
      fetchNewsById(newsId);
    }
  }, [newsId, isEditing]);

  async function fetchNewsById(id) {
    try {
      setLoading(true);
      const response = await api.get(`/news/${id}`);
      const news = response.data;
      setTitle(news.title || "");
      setContent(news.content || "");
      setImageFile(null); // Limpa o arquivo temporariamente
    } catch (error) {
      console.error("Erro ao carregar a notícia:", error);
      alert("Erro ao carregar a notícia. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      let response;

      if (isEditing && newsId) {
        // Atualiza a notícia existente
        response = await api.put(`/news/${newsId}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        // Cria uma nova notícia
        response = await api.post("/news", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      alert(response.data.message || "Operação realizada com sucesso!");
      navigate("/news");
    } catch (error) {
      console.error("Erro ao salvar a notícia:", error);
      alert("Erro ao salvar a notícia. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}>
        {isEditing ? "Editar Notícia" : "Cadastrar Notícia"}
      </h2>

      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da notícia"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </label>

        <label>
          Conteúdo:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo completo da notícia"
            required
            style={{
              width: "100%",
              height: "150px",
              padding: "8px",
              marginTop: "4px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </label>

        <label>
          Imagem da Notícia:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={{
              marginTop: "4px",
              marginBottom: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          {imageFile ? (
            <p style={{ marginTop: "4px" }}>Arquivo selecionado: {imageFile.name}</p>
          ) : (
            <p style={{ marginTop: "4px" }}>Nenhum arquivo escolhido</p>
          )}
        </label>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {isEditing ? "Salvar Alterações" : "Cadastrar Notícia"}
        </button>
      </form>
    </div>
  );
}

export default NewsForm;