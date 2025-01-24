
let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

console.log(`el numero secreto es ${numeroSecreto}`);

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;    
}


function verificarIntento() {
    let numeroDeUsuario = 0;
    numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Triple igual valida si es el mismo tipo de dato 
    if (numeroDeUsuario == numeroSecreto){
        asignarTextoElemento('p',`Felicidades, has acertado en ${intentos} ${intentos === 1 ? 'intento': 'intentos'}`); 
        // Quitar el disabled para el boton iniciar (disabled es considerado un atributo de la cajita html)  
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número ingresado es mayor que el número secreto.');
        } else{ 
            asignarTextoElemento('p','El número ingresado es menor que el número secreto.');
        }
        intentos++
        limpiarCaja();
    }    
}

function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    // Número entre 1 y 10
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números 
    if(listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        return null;
    } else {
        // Si el número generado está incluido en la lista.
        if(listaNumerosSorteados.includes(numeroGenerado)){
            // Llamamos a la misma función (Recursividad)
            return generarNumeroSecreto(); 
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
    
}

function reiniciarJuego(){
    // Limpiar caja
    limpiarCaja(); 

    // Reiniciar mensajes
    // Generar el número aleatorio secreto
    // Inicializar el número de intentos
    condicionesIniciales();

    // Deshabilitar el boton del nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function condicionesIniciales(){
    numeroSecreto = generarNumeroSecreto();
    if (numeroSecreto == null) {
        return;
    } 
    intentos = 1;
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);    
}

// Setear valores iniciales del juego
condicionesIniciales();

