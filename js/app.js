//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Input variables
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//-----------------------------------
eventListeners();
function eventListeners() {
    //As the app loads
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Input boxes
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reset formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Send email
    formulario.addEventListener('submit', enviarEmail);
}

//------------------------------------

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

//Input validation
function validarFormulario(e) {
    if (e.target.value.length > 0) {
        //Elimina los errores...
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {

        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
};
//Error function for the inputs
function mostrarError(mensaje) {
    const msjError = document.createElement('p');
    msjError.textContent = mensaje;
    msjError.classList.add('border', 'border-red-500', 'backgorund-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(msjError);
    }

}

//Envía el email
function enviarEmail(e) {
    e.preventDefault();
    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //Después de 3 segundos ocultar spinner y mostrar msj
    setTimeout(() => {
        spinner.style.display = 'none';

        //Mostratr mensaje de envío
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente. Gracias chul@.';

        //Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);
        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        
        setTimeout(() => {
            parrafo.remove(); //Eliminar el parrafo de envío

            resetearFormulario();
        }, 3000);

    }, 3000);
}

//Función que resetea el formulario 
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}
