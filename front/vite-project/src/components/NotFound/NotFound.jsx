import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"



function NotFound() {
    return (
      <div className={styles.notFoundContainer}>
        <div className={styles.notFoundContent}>
          <h1 className={styles.notFoundTitle}>404</h1>
          <h2 className={styles.notFoundSubtitle}>Página no encontrada</h2>
          <p className={styles.notFoundText}>
            Lo sentimos, la página que buscas no existe o ha sido movida.  
          </p>
          <Link to="/" className={styles.notFoundLink}>
            Volver al Home
          </Link>
        </div>
      </div>
    );
  }
  
  export default NotFound;