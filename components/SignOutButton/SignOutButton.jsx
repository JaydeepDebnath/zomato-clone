"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./SignOutButton.scss";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setIsSignedIn(!!token);
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/signout", { method: "POST" ,credentials: "include"  });
      router.push("/signin");
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
      className={`signout-button ${isSignedIn ? "signed-in" : "not-signed-in"}`}
      disabled={loading}
    >
      {loading ? (isSignedIn ? "Signing out..." : "Redirecting...") : isSignedIn ? "Sign Out" : "Sign Up"}
    </button>
  );
}
