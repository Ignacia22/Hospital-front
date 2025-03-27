import './App.css';
import MyAppointments from "./views/MyAppointments/MyAppointments";
import styles from "./Main.module.css";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Navbar from './components/Navbar/Navbar';
import NotFound from "./components/NotFound/NotFound";
import { UsersContext } from './context/UsersContext';
import AgendarTurno from './views/AgendarTurno/AgendarTurno';

function App() {
  const {user} = useContext(UsersContext)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !["/login", "/register"].includes(location.pathname)) {
      navigate("/login");
    } else if (user && ["/login", "/register"].includes(location.pathname)) {
      navigate("/");
    }
  }, [user, location.pathname, navigate]);

  const routesWithNavbar = ["/", "/misturnos"];

  return (
    <>
      {!user ? (
        <main className={styles.main}>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
      ) : (
        <>
          {routesWithNavbar.some(route => location.pathname.startsWith(route)) && (
            <header>
              <span> LOGO </span>
              <Navbar />
            </header>
          )}
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/misturnos' element={<MyAppointments />} />
              <Route path='/agendarturno' element={<AgendarTurno />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}


export default App;
