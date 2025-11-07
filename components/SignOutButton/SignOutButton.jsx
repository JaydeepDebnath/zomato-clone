"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./SignOutButton.scss";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // ✅ Check login status (example: via cookie or localStorage)
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setIsSignedIn(!!token);
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpRedirect = () => {
    router.push("/signup");
  };

  return (
    <button
      onClick={isSignedIn ? handleSignOut : handleSignUpRedirect}
      className={`signoutButton ${isSignedIn ? "signedIn" : "notSignedIn"}`}
      disabled={loading}
    >
      {loading
        ? "Signing out..."
        : isSignedIn
        ? "Sign Out"
        : "Sign Up"}
    </button>
  );
}
