import { Route, Routes } from "react-router-dom";
import './App.css'
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Conversation from "./pages/Conversation";
import ProtectedRoute from "./routes/ProtectedRoute";
import CodeGeneration from "./pages/CodeGeneration";
import ImageGeneration from "./pages/ImgeGeneratiobn";
import ContentGeneration from "./pages/ContentGeneration";

function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="conversation" element={<Conversation />} />
          <Route path="code" element={<CodeGeneration />} />
          <Route path="image" element={<ImageGeneration />} />
          <Route path="content" element={<ContentGeneration />} />
        </Route>
      </Route>
    </Routes>
   
  )
}

export default App
