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
    const fetchUserData = async () => {
      try {
        
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }

        // 🔹 Step 2: Decode JWT to extract userId (payload)
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload?._id;

        if (!userId) {
          console.error("User ID missing in token");
          router.push("/signin");
          return;
        }

        // 🔹 Step 3: Fetch full user details from backend using ID
        const res = await fetch(`/api/dashboard/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/signin");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
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
