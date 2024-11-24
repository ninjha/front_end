import React, { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css"; // Styles spécifiques
import Button from "../Autres/Button"; // Composant bouton (si configuré)
import Link from "next/link";
import { useRouter } from "next/router"; // Pour rediriger après déconnexion

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Vérifie l'état de connexion lors du chargement
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Si un token existe, l'utilisateur est connecté
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprime le token
    setIsLoggedIn(false); // Met à jour l'état local
    router.push("/"); // Redirige vers la page d'accueil
  };

  return (
    <nav className={styles.Header}>
      <Link href={"/"}>
        <h1>Blog de Cécil</h1> {/* Titre du site */}
      </Link>
      <div className={styles.navButtons}>
        {isLoggedIn ? (
          // Si connecté, affiche le bouton "Déconnexion"
          <Button onClick={handleLogout}>Déconnexion</Button>
        ) : (
          // Sinon, affiche les boutons "Se connecter" et "Créer un compte"
          <>
            <Link href={"/login"}>
              <Button>Se connecter</Button>
            </Link>
            <Link href={"/registration"}>
              <Button>Créer un compte</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
