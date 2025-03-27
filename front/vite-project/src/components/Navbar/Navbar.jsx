import Swal from "sweetalert2";
import Styles from "../Navbar/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Navbar() {
  const navigate = useNavigate();
  
  const {logOut} = useContext(UsersContext)

  const handleLogOut = () => {
    logOut()
    Swal.fire({
      icon: "warning",
      title: "Se cerró la sesión correctamente",
      timer: 2000, // Cierra automáticamente después de 2 segundos
      showConfirmButton: false,
    });
    navigate("/login"); // Redirige al login después de cerrar sesión
  };

  return (
    <div className={Styles.navbarContainer}>
      <nav className={Styles.navbar}>
      <span className={Styles.logo}>
      <img src={'https://st2.depositphotos.com/3867453/8252/v/450/depositphotos_82524726-stock-illustration-cross-plus-medical-logo-icon.jpg'} alt="Logo" className={Styles.logoImage} />
      </span>

        <li className={Styles.navItem}>
          <Link
            to="/"
            className={`${Styles.navLink} ${
              location.pathname === "/" ? Styles.active : ""
            }`}
          >
            Home
          </Link>
        </li>

        <li className={Styles.navItem}>
          <Link
            to="/misturnos"
            className={`${Styles.navLink} ${
              location.pathname === "/misturnos" ? Styles.active : ""
            }`}
          >
            Mis turnos
          </Link>
        </li>

        <li className={Styles.navItem}>
          <Link
            to="/agendarturno"
            className={`${Styles.navLink} ${
              location.pathname === "/agendarturno" ? Styles.active : ""
            }`}
          >
            Agregar turno
          </Link>
        </li>

        <li className={Styles.navItem}>
          <button
            className={`${Styles.navLinkButton}`} // Reutilizamos la clase para estilizar
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </li>
      </nav>
    </div>
  );
}

export default Navbar;
