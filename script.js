let intentos = 6;

fetch("https://random-word.ryanrk.com/api/en/word/random/?length=5")
    .then(response => response.json())
    .then(response => {
    console.log(response[0].toUpperCase());
    palabra = response[0].toUpperCase();
})
    .catch(error => {
        console.log("Error");
        let listaPalabras = ["PLACE", "APPLE", "CAMEL" , "CLEAN", "TRACE", "THREE", "BEACH", "DOLAR", "POUND", "LYRIC"];
        let posicion = Math.floor(Math.random() * listaPalabras.length);
        palabra = listaPalabras[posicion];
        console.log(palabra);
    });

const BUTTON = document.getElementById("guess-button");
const contadorIntentos = document.getElementById("attempts-count");

BUTTON.addEventListener("click", intentar);

function intentar() {
    console.log("click!");
    const intento = leerIntento();
    if (/\d/.test(intento)) {
        alert("Debe ingresar solo letras");
        return;
    }
    if (intento.length !== 5) {
        alert("Debe ingresar palabras de 5 letras");
        return;
    }

    intentos = intentos - 1 ;
    contadorIntentos.innerHTML =  intentos;
    console.log("te quedan ", intentos, " intentos");

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log(ROW);

    for (let i in intento) {
        //console.log(intento[i]);
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerHTML = intento[i];
        console.log(SPAN);
            if (palabra[i] === intento[i]) {
                SPAN.style.backgroundColor = "#79b851";
                console.log(intento[i], "verde");
            }else if (palabra.includes(intento[i])) {
                SPAN.style.backgroundColor = "#f3c237";
                console.log(intento[i], "amarillo");
            }else {
                SPAN.style.backgroundColor = "#a4aec4";
                console.log(intento[i], "gris");
            }
        console.log(SPAN);
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    if (intento === palabra) {
        console.log("Has ganado!");
        terminar("<h1>GANASTE!😀</h1>")
        return;
    }
    if (intentos == 0) {
        console.log("Has perdido!");
        terminar("<h1>PERDISTE!😖</h1>")
    }
}

function leerIntento() {
    const INTENTO = document.getElementById("guess-input").value.toUpperCase();
    return INTENTO;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    document.getElementById("attempts-container").style.display = "none";

    const volverIntentar = document.createElement("button");
    volverIntentar.innerHTML = "Volver a Intentar";
    volverIntentar.className = "retry-button";
    volverIntentar.onclick = function() {
        location.reload();
    };
    contenedor.appendChild(volverIntentar);
}