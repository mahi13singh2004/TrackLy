import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store.js"
import RedirectRoute from "./components/RedirectRoute"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing.jsx"
import CreateApplication from "./pages/CreateApplication.jsx";
import EditApplication from "./pages/EditApplication.jsx";
import Application from "./pages/Application.jsx"

const App = () => {
  const { checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<RedirectRoute><Login /></RedirectRoute>} />
        <Route path="/signup" element={<RedirectRoute><Signup /></RedirectRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Application /></ProtectedRoute>} />
        <Route path="/applications/new" element={<ProtectedRoute><CreateApplication /></ProtectedRoute>} />
        <Route path="/applications/:id" element={<ProtectedRoute><EditApplication /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;