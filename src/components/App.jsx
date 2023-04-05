import AppRouter from "./AppRouter";
import { AuthContextProvider } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <AuthContextProvider>
      <div className={styles.wrap}>
        <main className={styles.main}>
          <AppRouter />
          <Outlet />
        </main>
        <footer className={styles.footer}>
          @copy {new Date().getFullYear()} Agitter
        </footer>
      </div>
    </AuthContextProvider>
  );
}

export default App;
