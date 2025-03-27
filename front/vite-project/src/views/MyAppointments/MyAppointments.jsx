import { useContext, useEffect } from "react";
import Styles from "./MyAppointments.module.css"; 
import Appointment from "../../components/Appointment/Appointment";
import { UsersContext } from "../../context/UsersContext";

function MyAppointments() {
  const { userAppointments, getUserAppointment, user } = useContext(UsersContext);

  useEffect(() => {
    if (user) {
      getUserAppointment(user);
    }
  }, [user, getUserAppointment]);

  if (!userAppointments) {
    return <h2>Cargando turnos...</h2>; // Muestra un mensaje mientras se obtienen los turnos
  }

  return (
    <div className={Styles.contenedor}>
      <div className={Styles.contenedorH1}>
        <h1>Mis turnos</h1>

        <div className={Styles.containerAppointments}>
          {userAppointments.length > 0 ? (
            userAppointments.map((appointment, indice) => (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                showId={indice + 1}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
              />
            ))
          ) : (
            <h2>No hay turnos disponibles</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
