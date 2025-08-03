import React, { useEffect, useState } from "react";
import Login from "./login";
import LandingPage from "./LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  Link,
} from "react-router-dom";

import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // imported from firebase.js
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";


//
// Signup Component
//
function Signup() {
  const [email, setEmail] = useState(""), [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/map");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Sign Up</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

//
// AddVenue Component
//
function AddVenue({ onVenueAdded }) {
  const [name, setName] = useState(""), [latitude, setLatitude] = useState(""), [longitude, setLongitude] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVenue = {
      name,
      location: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] }
    };
    try {
      await axios.post(`${API_BASE}/api/venues`, newVenue);
      setMessage("Venue added successfully!");
      setName(""); setLatitude(""); setLongitude("");
      if (onVenueAdded) onVenueAdded();
    } catch {
      setMessage("Failed to add venue.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Venue</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Latitude" required value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <input type="number" placeholder="Longitude" required value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        <button type="submit">Add Venue</button>
      </form>
    </div>
  );
}

//
// MapPage Component
//
function MapPage() {
  const [venues, setVenues] = useState([]);
  const [addingVenue, setAddingVenue] = useState(false);

  const fetchVenues = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/venues`);
      setVenues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchVenues(); }, []);

  const user = auth.currentUser;

  return addingVenue ? (
    <AddVenue onVenueAdded={() => { setAddingVenue(false); fetchVenues(); }} />
  ) : (
    <div style={{ height: "100vh" }}>
      <header>
        <span>Hello, {user?.email}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
        <button onClick={() => setAddingVenue(true)}>+ Add Venue</button>
      </header>
      <MapContainer center={[20, 78]} zoom={5} style={{ height: "90vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {venues.map((v) => (
          v.location?.coordinates?.length === 2 && (
            <Marker key={v._id} position={[v.location.coordinates[1], v.location.coordinates[0]]}>
              <Popup>{v.name}</Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

//
// Main App
//
export default function App() {
  const [user, setUser] = useState(null), [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }), []);
  if (loading) return <div>Loading...</div>;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage user={user} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/map" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/map" />} />
        <Route path="/map" element={user ? <MapPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
