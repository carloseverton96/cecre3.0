// src/pages/news/NewsForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../constants/api";
import "../../styles/global.css";

function NewsForm() {
  const { id_news } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState({
    title: "",
    summary: "",
    date: "",
  });
  const [imageFile, setImageFile] = useState(null); // ← novo estado para upload
  const [preview, setPreview] = useState(null); // ← para exibir preview da imagem

  useEffect(() => {
    if (id_news) {
      loadNews();
    }
  }, [id_news]);

  async function loadNews() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/users/news/${id_news}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNews({
        title: response.data.title,
        summary: response.data.summary,
        date: response.data.date,
      });
      if (response.data.image) {
        setPreview(response.data.image);
      }
    } catch (error) {
      alert("Erro ao carregar a notícia.");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", news.title);
      formData.append("summary", news.summary);
      formData.append("date", news.date);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (id_news) {
        await api.put(`/users/news/${id_news}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Notícia atualizada com sucesso!");
      } else {
        await api.post(`/users/news`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Notícia cadastrada com sucesso!");
      }

      navigate("/news");
    } catch (error) {
      alert("Erro ao salvar a notícia.");
    }
  }

  return (
    <div className="container mt-page">
      <h2>{id_news ? "Editar Notícia" : "Cadastrar Notícia"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={news.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Resumo</label>
          <textarea
            name="summary"
            value={news.summary}
            onChange={handleChange}
            className="form-control"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label>Data</label>
          <input
            type="text"
            name="date"
            value={news.date}
            onChange={handleChange}
            className="form-control"
            placeholder="27 de Julho de 2025"
            required
          />
        </div>

        <div className="form-group">
          <label>Imagem da Notícia</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>

        {preview && (
          <div className="mt-3">
            <p>Pré-visualização:</p>
            <img src={preview} alt="Prévia" className="img-fluid rounded" style={{ maxHeight: 250 }} />
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          {id_news ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default NewsForm;
