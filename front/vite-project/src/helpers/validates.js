export const registerFormValidate = (input) => {
    const errors = {}


    if(!input.name.trim()) errors.name = "Nombre requerido"
    else if(!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(input.name)) errors.name = "El nombre debe ser un nombre valido"


    if(!input.email.trim()) errors.email = "Email requerido"
    else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.email)) errors.email = "El mail debe ser valido"
    
    if(!input.birthdate) errors.birthdate = "Fecha de nacimiento requerido"
    else {
        const today = new Date()
        const birthdate = new Date(input.birthdate)
        const age = today.getFullYear() - birthdate.getFullYear()

        if(age < 18) errors.birthdate = "Es requerido ser mayor de 18 años"
    }

    if(!input.nDni) errors.nDni = "El nDni es requerido"
    else if(!/^\d{7,8}$/.test(input.nDni)) errors.nDni = "El nDni debe ser solo numeros"
    else if(input.nDni.length < 7 || input.nDni.length > 8) {
        errors.nDni = "nDni tiene que ser entre 7 o 8 digitos"
    }

    if(!input.username.trim()) errors.username = "Nombre de usuario requerido"
    else if(!/^[a-zA-Z0-9._]{3,16}$/.test(input.username)) errors.username = "El nombre de usuario debe contener solo letras y numeros"


    if(!input.password.trim()) errors.password = "Contraseña requerida"
    else if(input.password.length < 8) errors.password = "La contraseña tiene un maximo de 8 caracteres"
    else  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
    }

    return errors;
}

export const loginFormValidate = (input) => {
    const errors = {}

    if(!input.username.trim()) errors.username = "Nombre de usuario requerido"
    else if(!/^[a-zA-Z0-9._]{3,16}$/.test(input.username)) errors.username = "El nombre de usuario debe contener solo letras y numeros"


    if(!input.password.trim()) errors.password = "Contraseña requerida"
    else if(input.password.length < 8) errors.password = "La contraseña tiene un maximo de 8 caracteres"
    else  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input.password)) {
        errors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";
    }

    return errors;
}

const isValidTime = (time) => {
    const [hour, minutes] = time.split(":").map(Number)
    const totalMinutes = hour * 60 + minutes
    const startTime = 9 * 60
    const endTime = 18 * 60
    return totalMinutes >= startTime && totalMinutes < endTime
}


export const dateTimeValidate = (input) => {
    const errors = {}

    const {date, time} = input

    const selectedDateTime = new Date(`${date}T${time}`)
    const now = new Date()
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    if(!date) errors.date = "La fecha es obligatoria"
    else if(selectedDateTime < now) errors.date = "No puede agendar cita en fechas pasadas"
    else if(selectedDateTime < twentyFourHoursLater) errors.date = "Debes seleccionar una fecha con por lo menos 24 horas de antelacción"

    else if(selectedDateTime.getDay() === 0 || selectedDateTime.getDay() === 6) errors.date = "No se puede agendar cita los fines de semana"



    if(!time) errors.time = "La hora es obligatoria"
    else if(!isValidTime(time)) errors.time = "La hora debe estar entre las 9 am y las 6 pm"



    return errors;
}