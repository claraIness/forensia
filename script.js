function actualizarHora() {

    const reloj = document.querySelector(".reloj");

    const ahora = new Date();

    reloj.textContent =
        "[HORA] " +
        ahora.toLocaleDateString() +
        " " +
        ahora.toLocaleTimeString();
}

setInterval(actualizarHora, 1000);

actualizarHora();
