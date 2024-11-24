import Head from "next/head";
import { useRouter } from "next/router"; // Pour la redirection après connexion
import { useState } from "react"; // Pour gérer les erreurs
import { useForm } from "react-hook-form"; // Pour la gestion du formulaire
import toast from "react-hot-toast"; // Pour les notifications

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(""); // État pour gérer les erreurs
  const router = useRouter(); // Utilisé pour rediriger après connexion

  const {
    register: connectForm,
    handleSubmit: handleConnectForm,
    formState: { errors: connectFormError },
    reset: resetConnectForm,
  } = useForm({
    mode: "onBlur", // Validation des champs lors de la perte de focus
  });

  // Fonction de gestion de la connexion
  const handleConnect = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST", // Requête POST pour la connexion
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataFromBack = await res.json();

      if (dataFromBack.result) {
        resetConnectForm(); // Réinitialise le formulaire
        setErrorMsg(""); // Efface le message d'erreur
        toast.success("Connexion réussie !");
        router.push("/dashboard"); // Redirection vers le tableau de bord
      } else {
        setErrorMsg("Identifiant ou mot de passe incorrect");
        toast.error("Identifiants invalides", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMsg("Une erreur s'est produite. Veuillez réessayer.");
      toast.error("Erreur serveur. Réessayez.", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Connexion</title>
      </Head>

      <h2>Connexion</h2>

      {/* Affichage des erreurs globales */}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <form onSubmit={handleConnectForm(handleConnect)}>
        {/* Champ : Nom d'utilisateur */}
        <div>
          <input
            type="text"
            placeholder="Entrez un identifiant"
            {...connectForm("username", {
              required: "Le nom d'utilisateur est requis",
            })}
          />
          {connectFormError.username && (
            <p style={{ color: "red" }}>{connectFormError.username.message}</p>
          )}
        </div>

        {/* Champ : Mot de passe */}
        <div>
          <input
            type="password"
            placeholder="Entrez un mot de passe"
            {...connectForm("password", {
              required: "Le mot de passe est requis",
            })}
          />
          {connectFormError.password && (
            <p style={{ color: "red" }}>{connectFormError.password.message}</p>
          )}
        </div>

        {/* Boutons */}
        <div>
          <button type="submit">Se Connecter</button>
          <button
            type="button"
            onClick={() => resetConnectForm()}
            style={{ marginLeft: "10px" }}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </div>
  );
}
