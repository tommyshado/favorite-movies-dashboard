import { Movies } from "./components/Movies"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DisplayFavorites } from "./components/DisplayFavorites";

function App() {
  return (
    <>
      <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/favorites" element={<DisplayFavorites />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
