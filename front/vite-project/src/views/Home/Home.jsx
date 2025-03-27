import NavigationBar from "../../components/Navbar/Navbar";
import styles from "./Home.module.css";
import Info from "../Info/Info";




function Home() {
    return (
        <>
        <NavigationBar />
            <div className={styles.homeContainer}>
                <h1 className={styles.title}>Cuidamos de ti y los tuyos</h1>
                <p className={styles.subtitle}>Con tecnología avanzada y un enfoque humano, estamos aquí para atender tus necesidades de salud y acompañarte en cada etapa de tu vida</p>
                <button type="button" className={styles.button}>Ver más</button>
            </div>
        <Info/>
        </>
    );
}

export default Home;