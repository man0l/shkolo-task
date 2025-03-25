import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonsList from "./components/Buttons/ButtonsList";
import AddButton from "./components/Buttons/AddButton";
import EditButton from "./components/Buttons/EditButton";
import './App.css'

function App() {
  return (    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ButtonsList />} />
          <Route path="/button/add/:order" element={<AddButton />} />
          <Route path="/button/edit/:id" element={<EditButton />} />
          <Route path="*" element={<><div>Error 404</div></>} />
        </Routes>
      </BrowserRouter>    
  )
}

export default App
