import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { useUser } from "./context/UserContext";

function App() {
  const { token } = useUser();
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
