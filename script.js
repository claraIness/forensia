function actualizarHora() {

    const reloj = document.querySelector(".reloj");

    if (!reloj) {
        return;
    }

    const ahora = new Date();

    reloj.textContent =
        "[HORA] " +
        ahora.toLocaleDateString() +
        " " +
        ahora.toLocaleTimeString();
}

setInterval(actualizarHora, 1000);

actualizarHora();

const buscadorExpedientes = document.getElementById("buscador-expedientes");
const filtrosExpedientes = document.querySelectorAll(".archivo-filtro");
const tarjetasExpedientes = document.querySelectorAll("[data-categoria][data-busqueda]");
const resultadoExpedientes = document.getElementById("archivo-resultado");
const seccionesExpedientes = {
    derecho: document.getElementById("derecho"),
    forense: document.getElementById("forense")
};

let filtroActivo = "todos";

function actualizarArchivo() {

    if (!buscadorExpedientes || !resultadoExpedientes) {
        return;
    }

    const consulta = buscadorExpedientes.value.trim().toLowerCase();
    let visibles = 0;
    const visiblesPorCategoria = {
        derecho: 0,
        forense: 0
    };

    tarjetasExpedientes.forEach((tarjeta) => {
        const coincideCategoria = filtroActivo === "todos" || tarjeta.dataset.categoria === filtroActivo;
        const coincideBusqueda = tarjeta.dataset.busqueda.includes(consulta);
        const visible = coincideCategoria && coincideBusqueda;

        tarjeta.classList.toggle("dossier-oculto", !visible);

        if (visible) {
            visibles++;
            visiblesPorCategoria[tarjeta.dataset.categoria]++;
        }
    });

    Object.entries(seccionesExpedientes).forEach(([categoria, titulo]) => {
        if (!titulo) {
            return;
        }

        const grilla = titulo.nextElementSibling;
        const visible = visiblesPorCategoria[categoria] > 0;

        titulo.classList.toggle("dossier-oculto", !visible);

        if (grilla) {
            grilla.classList.toggle("dossier-oculto", !visible);
        }
    });

    const etiqueta = visibles === 1 ? "expediente visible" : "expedientes visibles";
    resultadoExpedientes.textContent = `[ RESULTADO ] ${visibles} ${etiqueta}`;
}

filtrosExpedientes.forEach((boton) => {
    boton.addEventListener("click", () => {
        filtrosExpedientes.forEach((item) => item.classList.remove("active"));
        boton.classList.add("active");
        filtroActivo = boton.dataset.filtro;
        actualizarArchivo();

        const destino = filtroActivo === "forense" ? seccionesExpedientes.forense : seccionesExpedientes.derecho;

        if (destino) {
            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

if (buscadorExpedientes) {
    buscadorExpedientes.addEventListener("input", actualizarArchivo);
    actualizarArchivo();
}
