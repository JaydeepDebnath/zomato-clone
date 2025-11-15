"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./DashBoard.scss";
import SignOutButton from "../SignOutButton/SignOutButton";

export default function Dashboard() {
const router = useRouter();
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchUser = async () => {
try {
const res = await fetch("/api/dashboard/me", { credentials: "include" });
if (!res.ok) return router.push("/signin");
const data = await res.json();
setUser(data.user);
} catch (e) {
router.push("/signin");
} finally {
setLoading(false);
}
};
fetchUser();
}, [router]);

if (loading) return <div className="dash-loading">Loading...</div>;
if (!user) return null;

return (
<div className="dashboard-page">
<div className="cover-photo"></div>

<div className="profile-section">
<div className="avatar"></div>
<div className="profile-info">
<h2>{user.name}</h2>
<button className="edit-profile-btn">Edit Profile</button>
</div>
</div>

<div className="dashboard-main">
<aside className="sidebar-menu">
<h4>ACTIVITY</h4>
<ul>
<li className="active">Reviews</li>
<li>Photos</li>
<li>Followers</li>
<li>Recently Viewed</li>
</ul>

<h4>ONLINE ORDERING</h4>
<ul>
<li>My Addresses</li>
</ul>

<h4>PAYMENTS</h4>
<ul>
<li>Manage Cards</li>
</ul>

<h4>TABLE BOOKING</h4>
<ul>
<li>Your Bookings</li>
</ul>

<div className="logout-area">
<SignOutButton />
</div>
</aside>

<section className="content-area">
<h2>Reviews</h2>
<div className="empty-state">
<img src="/empty.svg" alt="empty" />
<p>Nothing here yet</p>
</div>
</section>
</div>
</div>
);
}