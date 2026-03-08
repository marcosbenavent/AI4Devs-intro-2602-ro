/**
 * Inversión de texto en tiempo real
 * Gestiona el input, el resultado, el botón Invertir, Copiar y ejemplos rápidos.
 */

(function () {
    'use strict';

    // Referencias a los elementos del DOM
    const inputTexto = document.getElementById('textoEntrada');
    const resultado = document.getElementById('resultado');
    const btnInvertir = document.getElementById('btnInvertir');
    const btnCopiar = document.getElementById('btnCopiar');
    const botonesEjemplo = document.querySelectorAll('.btn-ejemplo');

    // Umbral de caracteres para mostrar el botón "Invertir"
    const UMBRAL_BOTON_INVERTIR = 3;

    /**
     * Invierte una cadena de texto.
     * Ejemplo: 'AI4Devs' -> 'sveD4AI'
     * @param {string} texto - Cadena a invertir
     * @returns {string} Cadena invertida
     */
    function invertirTexto(texto) {
        if (typeof texto !== 'string') return '';
        return texto.split('').reverse().join('');
    }

    /**
     * Actualiza el contenido del resultado con el texto invertido
     * y aplica una animación breve para feedback visual.
     */
    function actualizarResultado() {
        const valor = inputTexto.value;
        const invertido = invertirTexto(valor);

        resultado.textContent = invertido || '—';
        resultado.classList.add('actualizado');
        setTimeout(function () {
            resultado.classList.remove('actualizado');
        }, 300);

        actualizarVisibilidadBotonInvertir(valor.length);
    }

    /**
     * Muestra u oculta el botón "Invertir" según la longitud del texto.
     * Transición suave manejada por CSS (clase .visible).
     * @param {number} longitud - Número de caracteres del input
     */
    function actualizarVisibilidadBotonInvertir(longitud) {
        if (longitud > UMBRAL_BOTON_INVERTIR) {
            btnInvertir.classList.add('visible');
            btnInvertir.setAttribute('aria-hidden', 'false');
        } else {
            btnInvertir.classList.remove('visible');
            btnInvertir.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * Copia el texto invertido actual al portapapeles.
     * Usa la API Clipboard si está disponible.
     */
    function copiarAlPortapapeles() {
        const textoACopiar = resultado.textContent;
        if (!textoACopiar || textoACopiar === '—') return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textoACopiar).then(function () {
                feedbackCopiar();
            }).catch(function () {
                fallbackCopiar(textoACopiar);
            });
        } else {
            fallbackCopiar(textoACopiar);
        }
    }

    /**
     * Feedback visual al copiar (cambia temporalmente el texto del botón).
     */
    function feedbackCopiar() {
        const textoOriginal = btnCopiar.textContent;
        btnCopiar.textContent = '¡Copiado!';
        btnCopiar.disabled = true;
        setTimeout(function () {
            btnCopiar.textContent = textoOriginal;
            btnCopiar.disabled = false;
        }, 1500);
    }

    /**
     * Fallback para navegadores sin soporte completo de Clipboard API.
     * @param {string} texto - Texto a copiar
     */
    function fallbackCopiar(texto) {
        const textarea = document.createElement('textarea');
        textarea.value = texto;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            feedbackCopiar();
        } catch (err) {
            console.warn('No se pudo copiar:', err);
        }
        document.body.removeChild(textarea);
    }

    /**
     * Rellena el input con el texto de ejemplo y actualiza el resultado.
     * @param {string} ejemplo - Texto del ejemplo (p. ej. 'AI4Devs', 'Marcos Benavent')
     */
    function rellenarEjemplo(ejemplo) {
        inputTexto.value = ejemplo;
        inputTexto.focus();
        actualizarResultado();
    }

    // ——— Eventos ———

    // Inversión en tiempo real al escribir
    inputTexto.addEventListener('input', actualizarResultado);

    // Al cargar la página, sincronizar estado del botón Invertir por si hay valor inicial
    inputTexto.addEventListener('paste', function () {
        setTimeout(actualizarResultado, 0);
    });

    // El botón "Invertir" refuerza la acción (el texto ya se invierte en tiempo real)
    btnInvertir.addEventListener('click', function () {
        actualizarResultado();
        resultado.focus({ preventScroll: true });
    });

    // Copiar al hacer clic en "Copiar"
    btnCopiar.addEventListener('click', copiarAlPortapapeles);

    // Ejemplos rápidos: rellenar input con el dato del botón
    botonesEjemplo.forEach(function (boton) {
        boton.addEventListener('click', function () {
            const ejemplo = boton.getAttribute('data-ejemplo') || boton.textContent;
            rellenarEjemplo(ejemplo);
        });
    });

    // Estado inicial: ocultar botón Invertir si el input está vacío
    actualizarVisibilidadBotonInvertir(inputTexto.value.length);
})();
