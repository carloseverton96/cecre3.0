// src/pages/news/NewsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../constants/api";
import "../../styles/global.css";

function NewsList() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/users/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewsList(response.data);
    } catch (error) {
      alert("Erro ao carregar as notícias.");
    }
  }

  return (
    <div className="container mt-page">
      <h2>Lista de Notícias</h2>
      <Link to="/news/create" className="btn btn-success mb-3">
        Nova Notícia
      </Link>
      <div className="row">
        {newsList.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100">
              <img src={item.image} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.summary}</p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <small className="text-muted">{item.date}</small>
                <Link to={`/news/edit/${item.id}`} className="btn btn-sm btn-primary">
                  Editar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
