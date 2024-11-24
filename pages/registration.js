import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // Pour rediriger après inscription
import toast from "react-hot-toast"; // Notifications
import { useForm } from "react-hook-form"; // Gestion du formulaire

export default function Registration() {
  const [errorMsg, setErrorMsg] = useState(""); // État pour gérer les erreurs
  const router = useRouter(); // Utilisé pour rediriger après inscription

  const {
    register: registerForm,
    handleSubmit: handleRegisterForm,
    formState: { errors: registerFormError, isSubmitting },
    reset: resetRegisterForm,
  } = useForm({
    mode: "onBlur", // Validation lors de la perte de focus
  });

  // Fonction pour gérer l'inscription
  const handleRegister = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataFromBack = await res.json();

      if (res.ok && dataFromBack.result) {
        // Succès
        resetRegisterForm(); // Réinitialise le formulaire
        setErrorMsg(""); // Efface le message d'erreur
        toast.success("Inscription réussie ! Redirection vers la connexion...");
        router.push("/login"); // Redirection vers la page de connexion
      } else {
        // Erreur côté back-end
        const errorMessage =
          dataFromBack.message || "Ce nom d'utilisateur est déjà utilisé.";
        setErrorMsg(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
        });
      }
    } catch (error) {
      // Erreur de connexion ou serveur
      console.error("Erreur lors de l'inscription :", error);
      setErrorMsg("Une erreur s'est produite. Veuillez réessayer.");
      toast.error("Erreur serveur. Réessayez.", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Inscription</title>
      </Head>

      <h2>Inscription</h2>

      {/* Affichage des erreurs globales */}
      {errorMsg && <p style={{ color: "red", fontWeight: "bold" }}>{errorMsg}</p>}

      <form onSubmit={handleRegisterForm(handleRegister)}>
        {/* Champ : Nom d'utilisateur */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Choisissez un identifiant"
            {...registerForm("username", {
              required: "Le nom d'utilisateur est requis",
              minLength: {
                value: 3,
                message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
              },
            })}
          />
          {registerFormError.username && (
            <p style={{ color: "red" }}>{registerFormError.username.message}</p>
          )}
        </div>

        {/* Champ : Mot de passe */}
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            placeholder="Choisissez un mot de passe"
            {...registerForm("password", {
              required: "Le mot de passe est requis",
              minLength: {
                value: 6,
                message: "Le mot de passe doit contenir au moins 6 caractères.",
              },
            })}
          />
          {registerFormError.password && (
            <p style={{ color: "red" }}>{registerFormError.password.message}</p>
          )}
        </div>

        {/* Boutons */}
        <div style={{ marginTop: "1rem" }}>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Chargement..." : "S'inscrire"}
          </button>
          <button
            type="button"
            onClick={() => resetRegisterForm()}
            style={{ marginLeft: "10px" }}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}

