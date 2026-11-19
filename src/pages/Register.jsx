import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password || !confirmPassword) return setMessage({ type: "error", text: "Todos los campos son obligatorios." });
    if (password.length < 6) return setMessage({ type: "error", text: "La contraseña debe tener al menos 6 caracteres." });
    if (password !== confirmPassword) return setMessage({ type: "error", text: "Las contraseñas no coinciden." });
    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });
      await register({ email: email.trim(), password });
      setPassword("");
      setConfirmPassword("");
      navigate("/profile");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section className="auth-section" aria-labelledby="register-title"><div className="auth-card">
      <span className="auth-card__eyebrow">Crea tu cuenta</span><h1 id="register-title">Registro</h1><p className="auth-card__intro">Completa tus datos para comenzar a disfrutar Mamma Mía.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="form-field"><span>Email</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nombre@correo.cl" autoComplete="email" /></label>
        <label className="form-field"><span>Contraseña</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 6 caracteres" autoComplete="new-password" /></label>
        <label className="form-field"><span>Confirmar contraseña</span><input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repite tu contraseña" autoComplete="new-password" /></label>
        <button className="button button--submit" type="submit" disabled={submitting}>{submitting ? "Registrando..." : "Registrarme"}</button>
      </form>
      {message.text && <p className={`form-message form-message--${message.type}`} role={message.type === "error" ? "alert" : "status"}>{message.text}</p>}
    </div></section>
  );
}
export default Register;
