import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Articles from "@/components/Article";

export default function Dashboard() {
  const [articles, setArticles] = useState([]); // Stocke les articles de l'utilisateur
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs API

  const {
    register: articleForm,
    handleSubmit: handleArticleForm,
    reset: resetArticleForm,
  } = useForm();

  // Récupérer les articles de l'utilisateur connecté
 {/**/} useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("http://localhost:3000/articles", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userid")}`, // Exemple de token
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des articles");
        }

        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les articles");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Fonction pour créer un nouvel article
  const handleCreateArticle = async (data) => {
    try {
      console.log(data);

      const userId = localStorage.getItem("blog-userId");
      if (userId) {

        const response = await fetch("http://localhost:3000/articles/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Exemple de token
          },
          body: JSON.stringify({ ...data, author: userId }),
        });


        if (!response.ok) {
          throw new Error("Erreur lors de la création de l'article");
        }

        const newArticle = await response.json();
        setArticles((prevArticles) => [...prevArticles, newArticle]); // Ajoute l'article à la liste
        resetArticleForm(); // Réinitialise le formulaire
        toast.success("Article créé avec succès !");
      } else {
        toast.error("Vous n'êtes pas connecté !")
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la création de l'article");
    }
  };

  // Fonction pour supprimer un article
  const handleDeleteArticle = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/articles/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      setArticles((prevArticles) => prevArticles.filter((article) => article._id !== id)); // Retire l'article supprimé
      toast.success("Article supprimé avec succès !");
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la suppression de l'article");
    }
  };

  return (
    <div>
      <h1>Tableau de bord</h1>

      {/* Affichage du formulaire pour créer un nouvel article */}
      <form onSubmit={handleArticleForm(handleCreateArticle)}>
        <div>
          <input
            type="text"
            placeholder="Titre de l'article"
            {...articleForm("title", { required: "Le titre est requis" })}
          />
        </div>
        <div>
          <textarea
            placeholder="Contenu de l'article"
            {...articleForm("content", { required: "Le contenu est requis" })}
          ></textarea>
        </div>
        <button type="submit">Créer un article</button>
      </form>

      <hr />

      {/* Gestion du chargement et des erreurs */}
      {loading && <p>Chargement des articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Affichage des articles */}
      {!loading && !error && articles.length === 0 && <p>Vous n'avez pas encore d'articles.</p>}

      {!loading &&
        !error &&
        articles.map((article) => (
          <div key={article._id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px 0" }}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <button onClick={() => handleDeleteArticle(article._id)}>Supprimer</button>
          </div>
        ))}
    </div>
  );
}