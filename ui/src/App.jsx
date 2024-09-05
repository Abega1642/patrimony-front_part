import { Footer } from "./components/UnchangedComponents/Footer.jsx";
import NavBar from "./components/UnchangedComponents/Navbar.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AddPossession from "./components/actions/AddPossession.jsx";
import UpdatePossession from "./components/actions/Update.jsx";
import PatrimonyPage from "./components/PatrimoinePage/PatrimonyPage.jsx";
import PossessionPage from "./components/PossessionPage/PossessionPage.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/possession" />} />
            <Route path='/possession' element = {<PossessionPage />}/>
            <Route path='/patrimoine' element = {<PatrimonyPage />} />
            <Route path='/possession/create' element = {<AddPossession/>} />
            <Route path='/possession/:id/update' element = {<UpdatePossession/>}/>
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
