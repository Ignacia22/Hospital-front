import { useContext } from "react";
import Styles from "./Appointment.module.css";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
function Appointment({ id, date, time, status, showId }) {

  const {cancelUserAppointment} = useContext(UsersContext)
  const handleCancel = async() => {
    try {
      await cancelUserAppointment(id)
      Swal.fire({
        icon: "warning",
        color: "red",
        title: "Cita cancelada con exito"
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cancelar la cita, intentalo nuevamente"
      })
    }
  }

  return (
    <div className={Styles.appointmentCard}>
      <div className={Styles.appointmentHeader}>
        <h3>Turno #{showId}</h3>
        <span
          className={
            status === "Active" ? Styles.statusActive : Styles.statusInactive
          }
        >
          {status}
        </span>
      </div>
      <div className={Styles.appointmentDetails}>
        <p>
          <strong>Fecha:</strong> <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{time}</span>
        </p>
      </div>
      <button className={`${Styles.cancelButton} ${status === "canceled" ? Styles.disable: ""}`}
      onClick={handleCancel}
      disabled={status === "cancelled"}
      >
        Cancelar Turno
      </button>
    </div>
  );
}

export default Appointment;
