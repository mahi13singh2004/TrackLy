import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store.js"
import RedirectRoute from "./components/RedirectRoute"
import Landing from "./pages/Landing.jsx"
const App = () => {
  const { checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<RedirectRoute><Login /></RedirectRoute>} />
        <Route path="/signup" element={<RedirectRoute><Signup /></RedirectRoute>} />
      </Routes>
    </>
  );
};

export default App;