"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SignUpForm.scss";

export default function SignUpForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => router.push("/signin"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <h1>Create an Account</h1>

      <form onSubmit={handleSubmit} className="signupForm">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="inputField"
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="inputField"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="inputField"
        />

        <button type="submit" disabled={loading} className="signupButton">
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="errorText">{error}</p>}
      {success && <p className="successText">{success}</p>}
    </div>
  );
}
