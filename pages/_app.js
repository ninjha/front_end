import Header from "@/components/Header/Header"; // Barre de navigation
import "@/styles/globals.css"; // Styles globaux de l'application
import { Toaster } from "react-hot-toast"; // Notifications

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* En-tête globale de l'application */}
      <header>
        <h1>Blog de Cécil</h1>
        <Header /> {/* Composant Header */}
      </header>

      {/* Contenu principal des pages */}
      <main>
        <Component {...pageProps} /> {/* Rendu dynamique des pages */}
      </main>

      {/* Notifications (react-hot-toast) */}
      <Toaster />

      {/* Pied de page (facultatif) */}
      <footer>
        <p>© 2024 Blog de Cécil. Tous droits réservés.</p>
      </footer>
    </>
  );
}
