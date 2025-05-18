import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/store/auth";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!user.username || !user.email || !user.phone || !user.password) {
      setError("All fields are required.");
      alert("❌ All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        alert("✅ Registration successful!");

        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });

        navigate("/");
      } else {
        const msg =
          data.extraDetails?.join("\n") ||
          data.message ||
          "Registration failed.";
        setError(msg);
        alert("❌ " + msg);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again later.");
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
                alt="registration illustration"
                width="400"
                height="500"
              />
            </div>

            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Username"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Phone"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
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
                  {isSubmitting ? "Registering..." : "Register Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
