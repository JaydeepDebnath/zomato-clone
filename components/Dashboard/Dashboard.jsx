"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "../SignOutButton/SignOutButton";
import "./DashBoard.scss";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        const res = await fetch("/api/dashboard/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.push("/signin");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Dashboard error:", error);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [router]);

  if (loading) return <p className="dashboard-loading">Loading...</p>;
  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome, {user.name}</h1>
        <p className="dashboard-email">📧 {user.email}</p>

        <p className="dashboard-role">
          {user.isAdmin ? "🛠️ Admin Access" : "👤 Standard User"}
        </p>

        <div className="signout-wrapper">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
