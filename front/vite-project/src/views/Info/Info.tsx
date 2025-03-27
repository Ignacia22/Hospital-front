import React from "react";
import styles from "./InfoStyles.module.css";

function AdditionalInfo() {
  return (
    <>
    <section className={styles.Container}>
      <div className={styles.Text}>
        <h2>Donde tu salud nos importa</h2>
        <p>Somos líderes en el cuidado de la salud, con un equipo comprometido con tu bienestar</p>
      </div>
      <div className={styles.Image}>
        <img
          src="https://images.unsplash.com/photo-1676663389653-9f39ea529690?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="imagenInfo"
        />
      </div>
    </section>

    <section className={styles.container}>
  <div className={styles.imageContainer}>
    <img src="https://images.pexels.com/photos/4506107/pexels-photo-4506107.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Descripción de la imagen" className={styles.image} />
  </div>
  <div className={styles.infoContainer}>
    <h2 className={styles.title}>Acompañandote en cada recuperacion</h2>
    <p className={styles.text}>Contamos con un equipo especializado en kinesiologia, y brindamos el apoyo en cada etapa de tu recuperación</p>
  </div>
</section>
    </>
    
    
  );
}

export default AdditionalInfo;
