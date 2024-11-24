import React, { useState, useEffect } from "react";

export default function Index() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/articles"); // Route pour tous les articles
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }
        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError("Impossible de charger les articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Articles disponibles</h1>
      {articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        articles.map((article) => (
          <div key={article._id} style={{ border: "1px solid #ddd", margin: "10px 0", padding: "10px" }}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))
      )}
    </div>
  );
}


