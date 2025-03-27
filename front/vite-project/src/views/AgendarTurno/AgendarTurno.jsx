import { useFormik } from "formik";
import styles from "./AgendarTurno.module.css"
import { dateTimeValidate } from "../../helpers/validates";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

const AgendarTurno = () => {

    const {createAppointment, user} = useContext(UsersContext)

    const formik = useFormik({
        initialValues: {
            date: "",
            time: ""
        },
        initialErrors: {
            date: "La fecha es requerida",
            time: "La hora es requerida"
        },
        validate: dateTimeValidate,
        onSubmit: async(values) => {
            const valuesObject = {
                ...values,
                userId: user
            }
            try {
                await createAppointment(valuesObject) 
                Swal.fire({
                    icon: "success",
                    title: "Turno agendado con exito"
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    text: "Intentelo nuevamente"
                })
            } finally {
                formik.resetForm()
            }
            
        }
    })


    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className={styles.title}>Agendar turno</h1>
      <form className={styles.container} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Fecha:</label>
          <input
            id="date"
            type="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            value={formik.values.date}
            onChange={formik.handleChange}
            className={formik.touched.date && formik.errors.date ? styles.errorInput: styles.input}
          />
          {formik.errors.date ? (
            <>
            <div className={styles.error}>{formik.errors.date}</div>
            </>
          ): null}
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="time">Hora</label>
          <input
            id="time"
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
            className={formik.touched.time && formik.errors.time ? styles.errorInput: styles.input}
          />
          {formik.errors.time ? (
            <div className={styles.error}>{formik.errors.time}</div>
          ): null}
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={ Object.keys(formik.errors).length > 0
          }>Agendar</button>
      </form>
    </div>
    )
}

export default AgendarTurno