import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Transactions from "./pages/Transactions";
import Navbar from "./pages/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/transactions" element={<Transactions/>} /> 
                 <Route path="/login" element={<Login/>}  />
                 <Route path="/signup" element={<SignUp/>} />
            </Routes> 
        </Router>
    );
}

export default App;
               
                
                
                
                