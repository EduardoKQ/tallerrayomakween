const diaSemana = {
    1: "Lunes",
    2: "Martes",
    3: "Miercoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sabado",
    7: "Domingo"
}

const horarioLaboral = {
    "semana": "8AM - 6PM",
    "sabado": "9AM - 2PM"
}

const mensajeAbierto = "Ven a nuesto taller! Estamos atendiendo";
const mensajeCerrado = "Nuesto taller esta cerrado :(";

const horaAperturaSemana = "08:00";
const horaCierreSemana = "18:00";
const horaAperturaSabado = "09:00";
const horaCierreSabado = "14:00";

function actualizarHora() {
    let hora, minutos, segundos;
    let dateTime = new Date();
    hora = dateTime.getHours();
    minutos = dateTime.getMinutes();
    segundos = dateTime.getSeconds();

    if (segundos < 10) {
        segundos = "0" + segundos;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }

    if (hora > 12) {
        horaActual = hora % 12 + ":" + minutos + " PM";
    }
    else {
        horaActual = hora % 12 + ":" + minutos + " AM";
    }
    console.log(horaActual);
    $(".hora-actual").text(horaActual);
}

function setApertura(dateTime) {

    function fechaEntre(fechaApertura, fechaCierre) {
        let fechaActual = dateTime;

        let apertura = new Date();
        apertura.setHours(fechaApertura.substr(0, 2));
        apertura.setMinutes(fechaApertura.substr(3, 2))
        apertura.setSeconds(0);

        let cierre = new Date();
        cierre.setHours(fechaCierre.substr(0, 2));
        cierre.setMinutes(fechaCierre.substr(3, 2))
        cierre.setSeconds(0);

        if (apertura < fechaActual && fechaActual < cierre) {
            return true;
        }
        return false;
    }

    let mensajeAtencion = "";
    let mensajeApertura = "";
    let estaAbierto = false;

    switch (dateTime.getDay()) {
        case 7: //domingo
            mensajeAtencion = "Hoy es Domingo. Solo atendemos de Lunes a Sabado."
            estaAbierto = false;
            break;
        case 6: //sabado
            mensajeAtencion = `Hoy Sabado atendemos de ${horarioLaboral["sabado"]}`;
            estaAbierto = fechaEntre(horaAperturaSabado, horaCierreSabado);
            break;
        default: //dia de semana
            mensajeAtencion = `Hoy ${diaSemana[dateTime.getDay()]} atendemos de ${horarioLaboral["semana"]}`;
            estaAbierto = fechaEntre(horaAperturaSemana, horaCierreSemana);
            break;
    }

    if (estaAbierto) {
        mensajeApertura = mensajeAbierto;
    } else {
        mensajeApertura = mensajeCerrado;
    }
    $(".mensaje-atencion").text(mensajeAtencion);
    $(".mensaje-apertura").text(mensajeApertura);
}

// API hora global
$(document).ready(function () {
    urlZonaHoraria = "http://worldtimeapi.org/api/timezone/America/Santiago";
    console.log("test");
    $.ajax({
        type: "get",
        url: urlZonaHoraria,
        success: function (response) {
            let dateTime = new Date(response.datetime);
            setApertura(dateTime);
        }
    });
});

// Contador de la hora
$(document).ready(function () {
    setInterval(() => {
        actualizarHora();
    }, 1000);
});