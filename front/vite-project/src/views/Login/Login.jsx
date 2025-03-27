import {useFormik} from "formik";
import styles from "./Login.module.css"
import { loginFormValidate } from "../../helpers/validates";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";



function Login() {

  const {loginUser} = useContext(UsersContext)

  const navigate = useNavigate()
  
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: loginFormValidate,
    initialErrors: {
      username: "Nombre de usuario requerido",
      password: "Contraseña requerida",
    },
    onSubmit: (values) => {
      loginUser(values)
      .then((res) => {
        console.log(res)
        if (res.status === 200) 
          Swal.fire({
            icon: "success",
            title: "Usuario logueado correctamente",
          });
          formik.resetForm();
          navigate("/")
      })

      .catch((err) => {
        if(err.response.data.code === 400) {
          Swal.fire({
            icon: "error",
            title: `${err.response.data.details}`,
            text: "Intentalo de nuevo"
          })
        } else if(err.response.data.message) {
          Swal.fire({
            icon: "error",
            title: `${err.response.data.message}`,
            text: "Intentalo de nuevo"
          })
        }
      })
      
    }
  },
  
)    



return (
        <div className={styles.fondo} style={{ textAlign: "center" }}>
      <h1 className={styles.formTitle}>Iniciar Sesión</h1>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
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
            {formik.errors.username ? formik.errors.username: ""}
          </label>
        </div>
        <div>
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
        <button className={styles.formButton}
          type="submit"
          disabled={
            !!formik.errors.username ||
            !!formik.errors.password
          }>Iniciar Sesión</button>
          <br />
          <label>
            Aun no tienes una cuenta ? <Link to="/register"> Registrate </Link>  
          </label>
      </form>
    </div>
    );
}

export default Login