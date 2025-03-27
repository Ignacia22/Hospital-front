import { useFormik } from "formik";
import Swal from "sweetalert2";
import styles from "./Register.module.css";
import { registerFormValidate } from "../../helpers/validates";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Register() {

  const {registerUser} = useContext(UsersContext)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    validate: registerFormValidate,
    initialErrors: {
      name: "Nombre requerido",
      email: "Email requerido",
      birthdate: "Fecha de nacimiento requerido",
      nDni: "El nDni es requerido",
      username: "Nombre de usuario requerido",
      password: "Contraseña requerida",
    },
    onSubmit: (values) => {
      registerUser(values)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Usuario registrado con éxito",
            });
            formik.resetForm();
          }
        })
        .catch((err) => {
          const errorDetail = err.response?.data?.detail || "";
          if (errorDetail.includes("email")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el mail: ${formik.values.email}`,
              text: "Intentelo nuevamente",
            });
          } else if (errorDetail.includes("username")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el username: ${formik.values.username}`,
              text: "Intentelo nuevamente",
            });
          } else if (errorDetail.includes("nDni")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el número de DNI: ${formik.values.nDni}`,
              text: "Intentelo nuevamente",
            });
          }
        });
    },
  }
);

  return (
    <div className={styles.fondo} style={{ textAlign: "center"}}>
      <h1 className={styles.formTitle}>Registrarse</h1>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre:</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.name ? formik.errors.name : ""}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.email ? formik.errors.email : ""}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            placeholder="Fecha de nacimiento"
            value={formik.values.birthdate}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.birthdate ? formik.errors.birthdate : ""}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Número de DNI:</label>
          <input
            type="text"
            name="nDni"
            placeholder="Número de DNI"
            value={formik.values.nDni}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.nDni ? formik.errors.nDni : ""}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.username ? formik.errors.username : ""}
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="❎❎❎❎❎"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <label className={styles.errorLabel}>
            {formik.errors.password ? formik.errors.password : ""}
          </label>
        </div>

        <button
          className={styles.formButton}
          type="submit"
          disabled={
            !!formik.errors.name ||
            !!formik.errors.email ||
            !!formik.errors.birthdate ||
            !!formik.errors.nDni ||
            !!formik.errors.username ||
            !!formik.errors.password
          }
        >
          Registrarse
        </button>
        <br />
          <label>
            Ya estas registrado ? <Link to="/login"> Ingresar </Link>  
          </label>
      </form>
    </div>
  );
}

export default Register;



