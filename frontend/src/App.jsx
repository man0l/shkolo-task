import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonsList from "./components/Buttons/ButtonsList";
import './App.css'

function App() {
  return (    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ButtonsList />} />
          <Route path="*" element={<><div>Error 404</div></>} />
        </Routes>
      </BrowserRouter>    
  )
}

export default App
