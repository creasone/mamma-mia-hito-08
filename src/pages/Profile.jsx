import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Profile() {
  const navigate = useNavigate();
  const { email, getProfile, logout } = useUser();
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile().catch((requestError) => setError(requestError.message));
  }, []);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <section className="auth-section" aria-labelledby="profile-title">
      <div className="auth-card profile-card">
        <span className="auth-card__eyebrow">Mi cuenta</span>
        <h1 id="profile-title">Perfil</h1>
        <p className="auth-card__intro">{email}</p>
        {error && <p className="form-message form-message--error" role="alert">{error}</p>}
        <button className="button button--submit" type="button" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </section>
  );
}

export default Profile;
