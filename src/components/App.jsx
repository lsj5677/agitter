import AppRouter from "./AppRouter";
import { AuthContextProvider } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
      <main>
        <Outlet />
      </main>
      <footer>@copy {new Date().getFullYear()} Agitter</footer>
    </AuthContextProvider>
  );
}

export default App;
