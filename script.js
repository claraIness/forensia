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

const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function desplazarSuave(destino) {
    const posicionInicial = window.pageYOffset;
    const posicionDestino = destino.getBoundingClientRect().top + posicionInicial - 24;
    const distancia = posicionDestino - posicionInicial;
    const duracion = Math.min(900, Math.max(450, Math.abs(distancia) * 0.45));
    let inicio = null;

    function suavizar(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animarScroll(tiempoActual) {
        if (!inicio) {
            inicio = tiempoActual;
        }

        const progreso = Math.min((tiempoActual - inicio) / duracion, 1);
        const avance = suavizar(progreso);

        window.scrollTo(0, posicionInicial + distancia * avance);

        if (progreso < 1) {
            window.requestAnimationFrame(animarScroll);
        }
    }

    window.requestAnimationFrame(animarScroll);
}

document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
        const idDestino = enlace.getAttribute("href");

        if (!idDestino || idDestino === "#") {
            return;
        }

        const destino = document.querySelector(idDestino);

        if (!destino) {
            return;
        }

        evento.preventDefault();

        desplazarSuave(destino);

        history.pushState(null, "", idDestino);
    });
});

document.querySelectorAll('a[href$=".html"]').forEach((enlace) => {
    enlace.addEventListener("click", (evento) => {
        const botonPrincipal = evento.button === 0;
        const modificador = evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey;

        if (!botonPrincipal || modificador || enlace.target === "_blank" || movimientoReducido) {
            return;
        }

        evento.preventDefault();
        document.body.classList.add("salida-pagina");

        window.setTimeout(() => {
            window.location.href = enlace.href;
        }, 180);
    });
});

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
            desplazarSuave(destino);
        }
    });
});

if (buscadorExpedientes) {
    buscadorExpedientes.addEventListener("input", actualizarArchivo);
    actualizarArchivo();
}
