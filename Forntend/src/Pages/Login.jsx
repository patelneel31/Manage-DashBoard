import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/store/auth";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        alert("✅ Login successful!");
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        const msg =
          data.extraDetails?.join("\n") || data.message || "Login failed";
        setError(msg);
        alert("❌ " + msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      alert("⚠️ Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/register.png"
                alt="login illustration"
                width="400"
                height="500"
              />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Login Form</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <br />
                <button
                  type="submit"
                  className="btn btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
