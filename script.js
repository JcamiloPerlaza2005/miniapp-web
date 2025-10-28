// --- Script principal para la gestión de reservas de viajes ---
// --- PROFESIONALIZADO: Comentarios claros, manejo robusto, modularidad y buenas prácticas UI/UX ---
document.addEventListener("DOMContentLoaded", function() {
    // --- Selección de elementos del DOM ---
    const hero = document.querySelector('.hero');
    const destinos = document.querySelector('.destinos');
    const reserva = document.querySelector('.reserva');
    const mensajeReserva = document.querySelector('.mensaje-reserva');
    const btnDestinos = document.getElementById('btnDestinos');
    const btnReservar = document.getElementById('btnReservar');
    const btnVolverDestinos = document.getElementById('btnVolverDestinos');
    const btnVolverReserva = document.getElementById('btnVolverReserva');
    const btnVolverMensaje = document.getElementById('btnVolverMensaje');
    const formReserva = document.getElementById('formReserva');
    const calendarioActual = document.getElementById('calendarioActual');
    const fechaViaje = document.getElementById('fechaViaje');
    const infoDestino = document.getElementById('infoDestino');
    const destinoBtns = document.querySelectorAll('.destino-btn');
    const selectDestino = document.getElementById('selectDestino');
    const diasViaje = document.getElementById('diasViaje');
    const personasViaje = document.getElementById('personasViaje');
    const valorViaje = document.getElementById('valorViaje');
    const tipoViaje = document.getElementById('tipoViaje');
    const campoFechaVuelta = document.getElementById('campoFechaVuelta');
    const fechaVuelta = document.getElementById('fechaVuelta');
    const hotelReserva = document.getElementById('hotelReserva');
    // --- NUEVO: Hora de viaje ---
    const horaViaje = document.getElementById('horaViaje');
    const menuReservas = document.getElementById('menuReservas');
    const modalConsultaReserva = document.getElementById('modalConsultaReserva');
    const cerrarModalReserva = document.getElementById('cerrarModalReserva');
    const btnBuscarReserva = document.getElementById('btnBuscarReserva');
    const inputCedulaConsulta = document.getElementById('inputCedulaConsulta');
    const resultadoReserva = document.getElementById('resultadoReserva');

    // --- Datos de hoteles y destinos ---
    // Lista de 50 hoteles
    const listaHoteles = [
        "Hotel París Palace", "Hotel Eiffel", "Hotel Louvre", "Hotel Champs Elysees", "Hotel Montmartre",
        "Roma Imperial", "Roma Plaza", "Roma Coliseo", "Hotel Vaticano", "Hotel Trastevere",
        "Tokio Sakura", "Tokio Tower", "Tokio Central", "Hotel Shibuya", "Hotel Ginza",
        "NYC Central", "NYC Broadway", "NYC Empire", "Hotel Manhattan", "Hotel Brooklyn",
        "London Bridge Hotel", "The Royal London", "London Palace", "Hotel Piccadilly", "Hotel Westminster",
        "Madrid Centro", "Hotel Gran Vía", "Madrid Palace", "Hotel Retiro", "Hotel Sol",
        "Barcelona Beach", "Hotel Gaudí", "Barcelona Plaza", "Hotel Ramblas", "Hotel Sagrada Familia",
        "Berlin Central", "Hotel Brandenburg", "Berlin Palace", "Hotel Alexanderplatz", "Hotel Mitte",
        "Amsterdam Canal", "Hotel Van Gogh", "Amsterdam Plaza", "Hotel Tulipán", "Hotel Rijksmuseum",
        "Lisboa Central", "Hotel Alfama", "Lisboa Palace", "Hotel Belém", "Hotel Rossio",
        "Praga Castle", "Hotel Charles", "Praga Plaza", "Hotel Vltava", "Hotel Mala Strana"
    ];

    // Lista de países/destinos (20 destinos)
    const paises = [
        "París", "Roma", "Tokio", "New York", "Londres", "Madrid", "Barcelona", "Berlín", "Ámsterdam", "Lisboa",
        "Praga", "Venecia", "Buenos Aires", "Ciudad de México", "Sídney", "Río de Janeiro", "El Cairo", "Estambul", "Bangkok", "Dubái"
    ];

    // --- Reparto de hoteles entre destinos ---
    // Asignar hoteles de manera equitativa y verificable
    const hotelesPorPais = {};
    
    // Asegurarnos de que la distribución sea exacta
    const totalHoteles = listaHoteles.length; // 50 hoteles
    const totalDestinos = paises.length; // 20 destinos
    const hotelesBase = 2; // Mínimo 2 hoteles por destino
    const destinosConHotelExtra = 10; // Los primeros 10 destinos tendrán 3 hoteles
    
    let hotelIndex = 0;
    
    // Distribuir los hoteles
    paises.forEach((pais, index) => {
        hotelesPorPais[pais] = [];
        const hotelesAsignar = index < destinosConHotelExtra ? 3 : 2;
        
        for (let i = 0; i < hotelesAsignar && hotelIndex < totalHoteles; i++) {
            hotelesPorPais[pais].push(listaHoteles[hotelIndex]);
            hotelIndex++;
        }
        
        // Verificar la asignación
        console.log(`${pais}: ${hotelesPorPais[pais].length} hoteles asignados:`, hotelesPorPais[pais]);
    });

    // Verificar la distribución de hoteles antes de crear destinosData
    console.log('Distribución de hoteles por país:', hotelesPorPais);
    
    // --- Datos de destinos con hoteles ---
    // Datos de destinos con hoteles (actualiza para los 20 destinos)
    const destinosData = {
        "París": {
            img: "https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/?io=transform:fill,width:768,height:384&consumerid=bwp",
            desc: "La ciudad del amor y la luz. Disfruta la Torre Eiffel y la gastronomía francesa.",
            precioBase: 120,
            hoteles: hotelesPorPais["París"]
        },
        "Roma": {
            img: "https://assets.voxcity.com/uploads/blog_images/What-is-the-first-place-to-visit-when-you-travel-to-Rome_original.jpg",
            desc: "Historia, arte y cultura en cada rincón. Visita el Coliseo y la Fontana di Trevi.",
            precioBase: 100,
            hoteles: hotelesPorPais["Roma"]
        },
        "Tokio": {
            img: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt0db69fde9a0f6d98/675e125faf051ba02b13ded4/japan-725347-Header_Desktop.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080",
            desc: "Tecnología y tradición. Vive la experiencia japonesa en sus templos y calles.",
            precioBase: 150,
            hoteles: hotelesPorPais["Tokio"]
        },
        "New York": {
            img: "https://blog.viajemos.com/wp-content/uploads/2023/06/%C2%BFQue-hacer-un-dia-en-New-York-3.jpg.webp",
            desc: "La ciudad que nunca duerme. Broadway, Central Park y mucho más.",
            precioBase: 130,
            hoteles: hotelesPorPais["New York"]
        },
        "Londres": {
            img: "https://www.visitlondon.com/-/media/images/london/visit/general-london/westminster-at-dusk-1920x582.jpg?rev=45c278db12f2496eba7e0e4f9b8a4eda&mw=1920&hash=A99F8950F2D1C2D03D18F3E560451A7B",
            desc: "La capital británica, famosa por el Big Ben y el Támesis.",
            precioBase: 110,
            hoteles: hotelesPorPais["Londres"]
        },
        "Madrid": {
            img: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt09d1de6a0e9b8f34/679fa8e212289967953af2d7/BCC-2024-EXPLORER-MADRID-GETTING-AROUND-HEADER_DESKTOP.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080",
            desc: "La ciudad del arte y la vida nocturna. Visita el Prado y la Gran Vía.",
            precioBase: 105,
            hoteles: hotelesPorPais["Madrid"]
        },
        "Barcelona": {
            img: "https://www.barcelo.com/guia-turismo/wp-content/uploads/que-visitar-en-barcelona-1.jpg",
            desc: "Ciudad mediterránea, famosa por la Sagrada Familia y sus playas.",
            precioBase: 108,
            hoteles: hotelesPorPais["Barcelona"]
        },
        "Berlín": {
            img: "https://www.estaentumundo.com/wp-content/imagenes/2019/09/puentes-berlin.jpg",
            desc: "Historia y modernidad. Descubre la Puerta de Brandeburgo.",
            precioBase: 115,
            hoteles: hotelesPorPais["Berlín"]
        },
        "Ámsterdam": {
            img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/504000/504090-old-town-amsterdam.jpg",
            desc: "Canales, bicicletas y museos. Vive la cultura holandesa.",
            precioBase: 112,
            hoteles: hotelesPorPais["Ámsterdam"]
        },
        "Lisboa": {
            img: "https://aunclicdelaaventura.com/wp-content/uploads/2021/11/Que-ver-en-Lisboa.jpg",
            desc: "Encanto y tradición portuguesa junto al Atlántico.",
            precioBase: 102,
            hoteles: hotelesPorPais["Lisboa"]
        },
        "Praga": {
            img: "https://www.barcelo.com/guia-turismo/wp-content/uploads/que-visitar-en-praga.jpg",
            desc: "Ciudad de castillos y puentes. Descubre la magia de Praga.",
            precioBase: 99,
            hoteles: hotelesPorPais["Praga"]
        },
        "Venecia": {
            img: "https://cdn2.civitatis.com/italia/venecia/galeria/grand-canal-venise",
            desc: "Canales y góndolas. Vive el romanticismo italiano.",
            precioBase: 125,
            hoteles: hotelesPorPais["Venecia"]
        },
        "Buenos Aires": {
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Puerto_Madero_-_Puente_de_la_mujer_%2844673627614%29.jpg/500px-Puerto_Madero_-_Puente_de_la_mujer_%2844673627614%29.jpg",
            desc: "Tango, cultura y gastronomía argentina.",
            precioBase: 98,
            hoteles: hotelesPorPais["Buenos Aires"]
        },
        "Ciudad de México": {
            img: "https://dynamic-media.tacdn.com/media/photo-o/2e/b8/24/b5/caption.jpg?w=1100&h=800&s=1",
            desc: "Historia azteca y modernidad latinoamericana.",
            precioBase: 97,
            hoteles: hotelesPorPais["Ciudad de México"]
        },
        "Sídney": {
            img: "https://www.civitatis.com/blog/wp-content/uploads/2018/01/vista-opera-house-sidney.jpg",
            desc: "Opera House y playas australianas.",
            precioBase: 140,
            hoteles: hotelesPorPais["Sídney"]
        },
        "Río de Janeiro": {
            img: "https://dynamic-media.tacdn.com/media/photo-o/2e/d5/f1/97/caption.jpg?w=1100&h=800&s=1",
            desc: "Carnaval, samba y el Cristo Redentor.",
            precioBase: 135,
            hoteles: hotelesPorPais["Río de Janeiro"]
        },
        "El Cairo": {
            img: "https://images.adsttc.com/media/images/64a2/cdae/cb9c/464f/a63a/9764/slideshow/cairo-architecture-city-guide-exploring-the-unique-architectural-blend-of-historical-and-contemporary-in-egypts-bustling-capital_23.jpg?1688391095",
            desc: "Pirámides y cultura egipcia milenaria.",
            precioBase: 125,
            hoteles: hotelesPorPais["El Cairo"]
        },
        "Estambul": {
            img: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltd4e1c33717ea9c21/64e20e43ad2e0876bf02eb12/0_-_BCC-2023-BEST-PLACES-TO-VISIT-IN-ISTANBUL-0.webp?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080",
            desc: "Puente entre Europa y Asia, mezquitas y bazares.",
            precioBase: 120,
            hoteles: hotelesPorPais["Estambul"]
        },
        "Bangkok": {
            img: "https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/bltb7332d3a2c6b58c1/6731c3a290cfa38000fd9a6f/BCC-2024-EXPLORER-BANGKOK-FUN-THINGS-TO-DO-HEADER_DESKTOP.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart&width=1920&height=1080",
            desc: "Templos, mercados y vida nocturna tailandesa.",
            precioBase: 110,
            hoteles: hotelesPorPais["Bangkok"]
        },
        "Dubái": {
            img: "https://www.dubai.it/es/wp-content/uploads/sites/100/dubai-puerto-deportivo-hd.jpg",
            desc: "Lujo y modernidad en el corazón de Emiratos Árabes.",
            precioBase: 160,
            hoteles: hotelesPorPais["Dubái"]
        }
    };

    // --- Asignar precios distintos a cada hotel ---
    const preciosHoteles = {};
    listaHoteles.forEach(hotel => {
        // Precio aleatorio entre 40 y 120 USD por noche/persona
        preciosHoteles[hotel] = Math.floor(Math.random() * 81) + 40;
    });

    // --- NUEVO: Lista de aerolíneas ---
    const listaAerolineas = [
        "AeroGlobal Express", "SkyWings", "VuelaPlus", "JetAndes", "FlyStar", 
        "AeroMundo", "TravelAir", "LatamXpress", "EuroWings", "PacificAir"
    ];

    // --- Actualizar select de destinos en el formulario ---
    if (selectDestino) {
        selectDestino.innerHTML = '<option value="">Seleccione...</option>' +
            Object.keys(destinosData).map(pais => `<option value="${pais}">${pais}</option>`).join('');
        // Llamar a actualizarHoteles si ya hay un destino seleccionado (por ejemplo, al volver a la sección)
        actualizarHoteles();
    }
    // --- NUEVO: Actualizar select de aerolíneas en el formulario ---
    if (aerolineaReserva) {
        aerolineaReserva.innerHTML = '<option value="">Seleccione aerolínea...</option>' +
            listaAerolineas.map(a => `<option value="${a}">${a}</option>`).join('');
    }

    // --- Mostrar información del destino seleccionado y botón de reserva ---
    destinoBtns.forEach(btn => {
        btn.onclick = () => {
            const pais = btn.getAttribute('data-pais');
            const data = destinosData[pais];
            infoDestino.innerHTML = `
                <img src="${data.img}" alt="${pais}" style="width:300px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.12);">
                <p><strong>${pais}</strong>: ${data.desc}</p>
                <button id="btnReservarDestino" style="margin-top:10px;padding:8px 16px;background:#0077b6;color:#fff;border:none;border-radius:5px;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.08);transition:background 0.2s;">Reservar</button>
            `;
            infoDestino.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Botón Reservar funcional
            const btnReservarDestino = document.getElementById('btnReservarDestino');
            btnReservarDestino.onclick = function() {
                fadeOutSection(destinos);
                setTimeout(() => {
                    fadeInSection(reserva);
                    mostrarCalendario();
                    valorViaje.innerHTML = "";
                    selectDestino.value = pais;
                    actualizarHoteles();
                    calcularValor();
                }, 400);
            };
        };
    });

    // --- Mostrar hoteles según destino seleccionado ---
    function actualizarHoteles() {
        const destino = selectDestino.value;

        // Limpiar y establecer opción por defecto
        hotelReserva.innerHTML = '<option value="">Seleccione hotel...</option>';

        if (destino && destinosData[destino]) {
            // Verificar que el destino tenga hoteles en destinosData
            console.log(`Actualizando hoteles para ${destino}:`, destinosData[destino].hoteles);
            
            const hotelesDisponibles = destinosData[destino].hoteles;
            
            if (!Array.isArray(hotelesDisponibles) || hotelesDisponibles.length === 0) {
                console.error(`No hay hoteles disponibles para ${destino}`);
                mostrarToast(`Error: No se encontraron hoteles para ${destino}`, "error");
                return;
            }

            // Mostrar mensaje con la cantidad exacta de hoteles
            mostrarToast(`${hotelesDisponibles.length} hoteles disponibles en ${destino}`, "info");
            
            // Agregar cada hotel inmediatamente al select
            hotelesDisponibles.forEach((hotel, index) => {
                const opt = document.createElement('option');
                opt.value = hotel;
                opt.textContent = hotel;
                opt.style.animation = 'optionFadeIn 0.5s ease-out forwards';
                hotelReserva.appendChild(opt);
                
                // Log para verificar que se agregó correctamente
                console.log(`Agregado hotel: ${hotel}`);
            });
            
            // Efecto visual de resaltado
            hotelReserva.classList.add('highlight');
            setTimeout(() => {
                hotelReserva.classList.remove('highlight');
            }, 1000);
            
        } else if (destino === "") {
            mostrarToast("Por favor, seleccione un destino primero", "info");
            const optDefault = document.createElement('option');
            optDefault.value = "";
            optDefault.textContent = "Primero seleccione un destino";
            optDefault.disabled = true;
            hotelReserva.appendChild(optDefault);
        }
        
        // Actualizar el valor total
        calcularValor();
    }

    // --- Evento para actualizar hoteles al cambiar el destino en el formulario de reserva ---
    if (selectDestino) {
        selectDestino.addEventListener('change', function() {
            actualizarHoteles();
            calcularValor();
        });
    }

    // --- Toast de mensajes profesionales ---
    function mostrarToast(mensaje, tipo = "info") {
        let toast = document.createElement('div');
        toast.className = `toast toast-${tipo}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.innerHTML = `<i class="fa fa-info-circle"></i> ${mensaje}`;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.background = tipo === "error" ? "#e63946" : "#0077b6";
        toast.style.color = "#fff";
        toast.style.padding = "14px 28px";
        toast.style.borderRadius = "10px";
        toast.style.boxShadow = "0 4px 18px rgba(0,0,0,0.18)";
        toast.style.zIndex = 9999;
        toast.style.opacity = 0;
        toast.style.fontSize = "1.08em";
        toast.style.letterSpacing = "0.02em";
        toast.style.transition = "opacity 0.5s";
        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = 1, 100);
        setTimeout(() => {
            toast.style.opacity = 0;
            setTimeout(() => document.body.removeChild(toast), 600);
        }, 2600);
    }

    // --- Spinner de carga profesional ---
    function mostrarSpinner() {
        let spinner = document.createElement('div');
        spinner.id = "spinnerCarga";
        spinner.innerHTML = `<i class="fa fa-spinner fa-spin fa-2x"></i>`;
        spinner.style.position = "fixed";
        spinner.style.top = "50%";
        spinner.style.left = "50%";
        spinner.style.transform = "translate(-50%, -50%)";
        spinner.style.background = "#fff";
        spinner.style.padding = "28px";
        spinner.style.borderRadius = "50%";
        spinner.style.boxShadow = "0 4px 18px rgba(0,0,0,0.18)";
        spinner.style.zIndex = 9999;
        document.body.appendChild(spinner);
    }
    function ocultarSpinner() {
        let spinner = document.getElementById("spinnerCarga");
        if (spinner) document.body.removeChild(spinner);
    }

    // --- Tooltips en botones principales ---
    function agregarTooltip(btn, texto) {
        btn.setAttribute('title', texto);
        btn.onmouseover = function() {
            btn.style.background = "#023e8a";
        };
        btn.onmouseout = function() {
            btn.style.background = "";
        };
    }
    agregarTooltip(btnDestinos, "Ver los destinos turísticos más populares");
    agregarTooltip(btnReservar, "Reserva tu viaje ahora");
    agregarTooltip(btnVolverDestinos, "Volver al menú principal");
    agregarTooltip(btnVolverReserva, "Volver al menú principal");
    agregarTooltip(btnVolverMensaje, "Volver al inicio");

    // --- Mensaje de bienvenida si ya hay reserva ---
    const reservaGuardada = localStorage.getItem('reserva');
    if (reservaGuardada) {
        const datos = JSON.parse(reservaGuardada);
        mostrarToast(`¡Bienvenido de nuevo, ${datos.nombre}!`, "info");
    }

    // --- Modal de confirmación profesional ---
    function mostrarModalConfirmacion(datos, onConfirm) {
        let modal = document.createElement('div');
        modal.id = "modalConfirmacion";
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.style.position = "fixed";
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = "100vw";
        modal.style.height = "100vh";
        modal.style.background = "rgba(0,0,0,0.35)";
        modal.style.display = "flex";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "center";
        modal.style.zIndex = 10000;

        let resumen = `
            <div style="background:#fff;padding:32px 28px;border-radius:12px;box-shadow:0 6px 32px rgba(0,0,0,0.18);max-width:400px;">
                <h3 style="margin-top:0;color:#0077b6;">¿Confirmar reserva?</h3>
                <ul style="list-style:none;padding:0;font-size:1em;">
                    <li><b>Nombre:</b> ${datos.nombre}</li>
                    <li><b>Email:</b> ${datos.email}</li>
                    <li><b>Destino:</b> ${datos.destino}</li>
                    <li><b>Hotel:</b> ${datos.hotel}</li>
                    <li><b>Aerolínea:</b> ${datos.aerolinea}</li>
                    <li><b>Tipo de viaje:</b> ${datos.tipoViaje === 'idaVuelta' ? 'Ida y vuelta' : 'Solo ida'}</li>
                    <li><b>Fecha ida:</b> ${datos.fecha}</li>
                    <li><b>Hora de viaje:</b> ${datos.horaViaje}</li>
                    ${datos.fechaVuelta ? `<li><b>Fecha vuelta:</b> ${datos.fechaVuelta}</li>` : ""}
                    <li><b>Días:</b> ${datos.dias}</li>
                    <li><b>Personas:</b> ${datos.personas}</li>
                    <li><b>Valor:</b> $${datos.valor} USD</li>
                </ul>
                <div style="margin-top:18px;text-align:right;">
                    <button id="btnModalCancelar" style="margin-right:10px;padding:7px 18px;background:#adb5bd;color:#fff;border:none;border-radius:5px;cursor:pointer;">Cancelar</button>
                    <button id="btnModalConfirmar" style="padding:7px 18px;background:#0077b6;color:#fff;border:none;border-radius:5px;cursor:pointer;">Confirmar</button>
                </div>
            </div>
        `;
        modal.innerHTML = resumen;
        document.body.appendChild(modal);

        document.getElementById('btnModalCancelar').onclick = function() {
            document.body.removeChild(modal);
        };
        document.getElementById('btnModalConfirmar').onclick = function() {
            document.body.removeChild(modal);
            onConfirm();
        };
    }

    // --- Guardar todas las reservas en localStorage ---
    function guardarReserva(datos) {
        let reservas = [];
        try {
            reservas = JSON.parse(localStorage.getItem('todasReservas')) || [];
        } catch (e) { reservas = []; }
        reservas.push(datos);
        localStorage.setItem('todasReservas', JSON.stringify(reservas));
        // También guardar la última reserva para compatibilidad con el flujo anterior
        localStorage.setItem('reserva', JSON.stringify(datos));
    }

    // --- Validación profesional en formulario de reserva ---
    let enviando = false;
    formReserva.onsubmit = function(e) {
        e.preventDefault();
        if (enviando) return; // Previene doble envío

        // Limpiar feedback visual previo
        Array.from(formReserva.elements).forEach(el => {
            el.classList.remove('input-error');
            el.removeAttribute('aria-invalid');
        });

        // Validación de campos obligatorios
        const email = formReserva.email.value.trim();
        const telefono = formReserva.telefono.value.trim();
        let primerError = null;

        // Validación profesional de email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarToast("Por favor ingresa un correo válido.", "error");
            formReserva.email.classList.add('input-error');
            formReserva.email.setAttribute('aria-invalid', 'true');
            if (!primerError) primerError = formReserva.email;
        }
        // Validación profesional de teléfono
        if (!/^[0-9]{7,15}$/.test(telefono)) {
            mostrarToast("Por favor ingresa un teléfono válido.", "error");
            formReserva.telefono.classList.add('input-error');
            formReserva.telefono.setAttribute('aria-invalid', 'true');
            if (!primerError) primerError = formReserva.telefono;
        }
        // Validación de campos obligatorios
        if (!formReserva.nombre.value.trim() || !formReserva.cedula.value.trim() || !formReserva.fechaNacimiento.value.trim()) {
            mostrarToast("Por favor completa todos los campos obligatorios.", "error");
            [formReserva.nombre, formReserva.cedula, formReserva.fechaNacimiento].forEach(el => {
                if (!el.value.trim()) {
                    el.classList.add('input-error');
                    el.setAttribute('aria-invalid', 'true');
                }
            });
            if (!primerError) primerError = [formReserva.nombre, formReserva.cedula, formReserva.fechaNacimiento].find(el => !el.value.trim());
        }
        // Validación de destino y hotel
        if (!formReserva.destino.value || !formReserva.hotel.value) {
            mostrarToast("Selecciona un destino y un hotel.", "error");
            formReserva.destino.classList.add('input-error');
            formReserva.hotel.classList.add('input-error');
            formReserva.destino.setAttribute('aria-invalid', 'true');
            formReserva.hotel.setAttribute('aria-invalid', 'true');
            if (!primerError) primerError = formReserva.destino;
        }
        // Validación de aerolínea
        if (!formReserva.aerolinea.value) {
            mostrarToast("Selecciona una aerolínea.", "error");
            formReserva.aerolinea.classList.add('input-error');
            formReserva.aerolinea.setAttribute('aria-invalid', 'true');
            if (!primerError) primerError = formReserva.aerolinea;
        }
        // Validación de hora de viaje
        if (!formReserva.horaViaje.value) {
            mostrarToast("Selecciona la hora de viaje.", "error");
            formReserva.horaViaje.classList.add('input-error');
            formReserva.horaViaje.setAttribute('aria-invalid', 'true');
            if (!primerError) primerError = formReserva.horaViaje;
        }
        // Validación de fechas
        if (formReserva.tipoViaje.value === 'idaVuelta') {
            if (!formReserva.fecha.value || !formReserva.fechaVuelta.value) {
                mostrarToast("Completa ambas fechas de ida y vuelta.", "error");
                formReserva.fecha.classList.add('input-error');
                formReserva.fechaVuelta.classList.add('input-error');
                formReserva.fecha.setAttribute('aria-invalid', 'true');
                formReserva.fechaVuelta.setAttribute('aria-invalid', 'true');
                if (!primerError) primerError = formReserva.fecha;
            } else if (formReserva.fecha.value > formReserva.fechaVuelta.value) {
                mostrarToast("La fecha de vuelta debe ser posterior a la de ida.", "error");
                formReserva.fechaVuelta.classList.add('input-error');
                formReserva.fechaVuelta.setAttribute('aria-invalid', 'true');
                if (!primerError) primerError = formReserva.fechaVuelta;
            }
        }

        // Si hay error, enfoca y hace scroll
        if (primerError) {
            primerError.focus();
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            logEvento("Validación fallida en formulario de reserva", { campo: primerError.name });
            return;
        }

        // --- Resumen de datos para confirmación ---
        const destino = formReserva.destino.value;
        const hotel = formReserva.hotel.value;
        const dias = parseInt(formReserva.dias.value) || 0;
        const personas = parseInt(formReserva.personas.value) || 0;
        let valorDestino = 0;
        let valorHotel = 0;
        let total = 0;
        if (destino && dias > 0 && personas > 0 && destinosData[destino]) {
            valorDestino = destinosData[destino].precioBase * dias * personas;
        }
        if (hotel && dias > 0 && personas > 0 && preciosHoteles[hotel]) {
            valorHotel = preciosHoteles[hotel] * dias * personas;
        }
        if (valorDestino > 0 && valorHotel > 0) {
            total = valorDestino + valorHotel;
        }

        const datos = {
            nombre: formReserva.nombre.value,
            email: formReserva.email.value,
            telefono: formReserva.telefono.value,
            cedula: formReserva.cedula.value,
            fechaNacimiento: formReserva.fechaNacimiento.value,
            destino: destino,
            tipoViaje: formReserva.tipoViaje.value,
            fecha: formReserva.fecha.value,
            horaViaje: formReserva.horaViaje.value, // NUEVO
            fechaVuelta: formReserva.tipoViaje.value === 'idaVuelta' ? formReserva.fechaVuelta.value : null,
            dias: dias,
            personas: personas,
            hotel: hotel,
            aerolinea: formReserva.aerolinea.value, // NUEVO
            valorDestino: valorDestino,
            valorHotel: valorHotel,
            valor: total
        };

        // --- PROFESIONAL: Log de evento de intento de reserva ---
        logEvento("Formulario de reserva validado correctamente", { nombre: formReserva.nombre.value, destino: formReserva.destino.value });

        mostrarModalConfirmacion(datos, function() {
            enviando = true;
            mostrarSpinner();
            setTimeout(() => {
                ocultarSpinner();
                guardarReserva(datos);
                fadeOutSection(reserva);
                setTimeout(() => {
                    mensajeReserva.querySelector('h3').textContent = "¡Reserva realizada con éxito!";
                    mensajeReserva.querySelector('p').innerHTML = `
                        <span style="color:#0077b6;font-weight:bold;">Gracias por reservar con nosotros.</span><br>
                        <span style="color:#0096c7;">Te hemos enviado la confirmación a tu correo.</span>
                        <br>
                        <span style="color:#0077b6;">Valor destino:</span> $${valorDestino} USD<br>
                        <span style="color:#0096c7;">Valor hotel:</span> $${valorHotel} USD<br>
                        <span style="color:#023e8a;font-weight:bold;">Valor total:</span> $${total} USD
                    `;
                    fadeInSection(mensajeReserva);
                    mostrarToast("Reserva confirmada. Revisa tu correo.", "info");
                    // Limpiar formulario tras éxito
                    formReserva.reset();
                    actualizarHoteles();
                    valorViaje.innerHTML = "";
                    enviando = false;

                    // --- PROFESIONAL: Log de reserva exitosa ---
                    logEvento("Reserva realizada con éxito", datos);

                    // --- NUEVO: Mostrar formulario de personas después de mensaje de éxito ---
                    datosReservaTemporal = datos;
                    setTimeout(() => {
                        fadeOutSection(mensajeReserva);
                        crearFormularioPersonas(parseInt(datos.personas) || 1);
                    }, 1800);
                }, 400);
            }, 1200);
        });
    };

    // --- NUEVO: Sección/formulario para datos de cada persona ---
    let formularioPersonas = null;
    let datosReservaTemporal = null;

    function crearFormularioPersonas(cantidad) {
        if (formularioPersonas) formularioPersonas.remove();

        formularioPersonas = document.createElement('div');
        formularioPersonas.className = 'formulario-personas';
        formularioPersonas.style.background = "#fff";
        formularioPersonas.style.padding = "32px 24px";
        formularioPersonas.style.borderRadius = "12px";
        formularioPersonas.style.boxShadow = "0 6px 32px rgba(0,0,0,0.12)";
        formularioPersonas.style.maxWidth = "600px";
        formularioPersonas.style.margin = "40px auto";
        formularioPersonas.style.display = "block";
        formularioPersonas.style.transition = "opacity 0.5s";
        formularioPersonas.innerHTML = `<h3 style="color:#0077b6;">Datos de los viajeros</h3>
            <form id="formPersonas">
                ${Array.from({length: cantidad}).map((_, i) => `
                <fieldset style="margin-bottom:18px;padding:12px 10px;border:1px solid #eee;border-radius:8px;">
                    <legend style="color:#0096c7;font-weight:bold;">Persona ${i+1}</legend>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <input type="text" name="nombre_${i}" placeholder="Nombre completo" required style="flex:1;min-width:120px;">
                        <input type="text" name="apellido_${i}" placeholder="Apellido" required style="flex:1;min-width:120px;">
                        <input type="text" name="cedula_${i}" placeholder="Cédula" required style="flex:1;min-width:100px;">
                        <input type="date" name="fechaNacimiento_${i}" placeholder="Fecha de nacimiento" required style="flex:1;min-width:120px;">
                        <input type="tel" name="telefono_${i}" placeholder="Teléfono" required style="flex:1;min-width:110px;">
                        <input type="email" name="email_${i}" placeholder="Correo electrónico" required style="flex:1;min-width:140px;">
                    </div>
                </fieldset>
                `).join('')}
                <div style="text-align:right;">
                    <button type="submit" style="padding:8px 22px;background:#0077b6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Finalizar</button>
                </div>
            </form>
        `;
        document.body.appendChild(formularioPersonas);

        // Validación y envío del formulario de personas
        const formPersonas = formularioPersonas.querySelector('#formPersonas');
        formPersonas.onsubmit = function(e) {
            e.preventDefault();
            let error = false;
            let personas = [];
            for (let i = 0; i < cantidad; i++) {
                const nombre = formPersonas[`nombre_${i}`].value.trim();
                const apellido = formPersonas[`apellido_${i}`].value.trim();
                const cedula = formPersonas[`cedula_${i}`].value.trim();
                const fechaNacimiento = formPersonas[`fechaNacimiento_${i}`].value.trim();
                const telefono = formPersonas[`telefono_${i}`].value.trim();
                const email = formPersonas[`email_${i}`].value.trim();
                if (!nombre || !apellido || !cedula || !fechaNacimiento || !telefono || !email) {
                    mostrarToast(`Completa todos los datos de la persona ${i+1}`, "error");
                    logEvento("Falta información en formulario de personas", { persona: i+1 });
                    error = true;
                    break;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    mostrarToast(`Correo inválido en persona ${i+1}`, "error");
                    logEvento("Correo inválido en formulario de personas", { persona: i+1, email });
                    error = true;
                    break;
                }
                if (!/^[0-9]{7,15}$/.test(telefono)) {
                    mostrarToast(`Teléfono inválido en persona ${i+1}`, "error");
                    logEvento("Teléfono inválido en formulario de personas", { persona: i+1, telefono });
                    error = true;
                    break;
                }
                personas.push({
                    nombre,
                    apellido,
                    cedula,
                    fechaNacimiento,
                    telefono,
                    email
                });
            }
            if (error) return;

            // Guardar datos de personas en la reserva y en todas las reservas
            if (datosReservaTemporal) {
                datosReservaTemporal.personasDetalles = personas;
                localStorage.setItem('reserva', JSON.stringify(datosReservaTemporal));
                // Actualizar en todasReservas
                let reservas = [];
                try {
                    reservas = JSON.parse(localStorage.getItem('todasReservas')) || [];
                } catch (e) { reservas = []; }
                // Buscar la reserva por cédula y actualizar personasDetalles
                const idx = reservas.findIndex(r =>
                    r.cedula === datosReservaTemporal.cedula &&
                    r.fecha === datosReservaTemporal.fecha &&
                    r.destino === datosReservaTemporal.destino
                );
                if (idx !== -1) {
                    reservas[idx].personasDetalles = personas;
                    localStorage.setItem('todasReservas', JSON.stringify(reservas));
                }
            }

            formularioPersonas.innerHTML = `<h3 style="color:#0077b6;">¡Datos registrados con éxito!</h3>
                <p style="color:#0096c7;">Gracias por completar la información de todos los viajeros.</p>
                <div style="text-align:center;margin-top:18px;">
                    <button id="btnVolverInicioFinal" style="padding:8px 22px;background:#0077b6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Volver al inicio</button>
                </div>
            `;
            document.getElementById('btnVolverInicioFinal').onclick = function() {
                formularioPersonas.remove();
                fadeInSection(hero);
            };
            mostrarToast("Datos de viajeros guardados correctamente.", "info");
        };
    }

    // --- Estilos para feedback visual de error en inputs ---
    const style = document.createElement('style');
    style.innerHTML = `
        .input-error {
            border: 2px solid #e63946 !important;
            background: #fff0f3 !important;
            box-shadow: 0 0 6px #e63946;
        }
        .toast[role="alert"] { outline: none; }
    `;
    document.head.appendChild(style);

    // --- Feedback visual en selects y botones principales ---
    [selectDestino, hotelReserva, tipoViaje].forEach(el => {
        if (el) {
            el.addEventListener('focus', function() {
                el.style.boxShadow = '0 0 8px #00b4d8';
            });
            el.addEventListener('blur', function() {
                el.style.boxShadow = '';
            });
        }
    });
    [btnDestinos, btnReservar, btnVolverDestinos, btnVolverReserva, btnVolverMensaje].forEach(btn => {
        if (btn) {
            btn.addEventListener('mousedown', function() {
                btn.style.transform = 'scale(0.97)';
            });
            btn.addEventListener('mouseup', function() {
                btn.style.transform = '';
            });
            btn.addEventListener('mouseleave', function() {
                btn.style.transform = '';
            });
        }
    });

    // --- Calendario actual y restricción de fechas ---
    function mostrarCalendario() {
        const hoy = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        calendarioActual.innerHTML = `<strong>Hoy:</strong> ${hoy.toLocaleDateString('es-ES', opciones)}`;
        fechaViaje.min = hoy.toISOString().split('T')[0];
    }

    // --- Cálculo profesional del valor del viaje y hotel por separado ---
    function calcularValor() {
        const destino = selectDestino.value;
        const hotel = hotelReserva.value;
        const dias = parseInt(diasViaje.value) || 0;
        const personas = parseInt(personasViaje.value) || 0;
        let valorDestino = 0;
        let valorHotel = 0;
        let total = 0;

        if (destino && dias > 0 && personas > 0 && destinosData[destino]) {
            valorDestino = destinosData[destino].precioBase * dias * personas;
        }
        if (hotel && dias > 0 && personas > 0 && preciosHoteles[hotel]) {
            valorHotel = preciosHoteles[hotel] * dias * personas;
        }
        if (valorDestino > 0 && valorHotel > 0) {
            total = valorDestino + valorHotel;
        }

        let html = "";
        if (valorDestino > 0) {
            html += `<div>
                <span style="color:#0077b6;font-weight:bold;">Valor destino:</span> $${valorDestino} USD
            </div>`;
        }
        if (valorHotel > 0) {
            html += `<div>
                <span style="color:#0096c7;font-weight:bold;">Valor hotel (${hotel}):</span> $${valorHotel} USD <span style="font-size:0.9em;color:#888;">($${preciosHoteles[hotel]} x noche/persona)</span>
            </div>`;
        }
        if (valorDestino > 0 && valorHotel > 0) {
            html += `<div style="margin-top:6px;">
                <span style="color:#023e8a;font-weight:bold;">Valor total del viaje:</span> $${total} USD
            </div>`;
        }
        valorViaje.innerHTML = html;
        return { valorDestino, valorHotel, total };
    }

    // --- Actualizar el cálculo cuando se selecciona el hotel ---
    if (hotelReserva) {
        hotelReserva.addEventListener('change', calcularValor);
    }

    // --- Mensaje profesional en promociones ---
    window.mostrarPromocion = function() {
        mostrarToast("¡Aprovecha nuestras promociones especiales de temporada!", "info");
    };

    // --- PROFESIONAL: Función para loguear eventos importantes ---
    function logEvento(mensaje, datos = {}) {
        if (window.console && window.console.info) {
            console.info(`[LOG EVENTO]: ${mensaje}`, datos);
        }
    }

    // --- PROFESIONAL: Función para loguear errores detallados ---
    function logError(mensaje, error = {}) {
        if (window.console && window.console.error) {
            console.error(`[ERROR]: ${mensaje}`, error);
        }
    }

    // --- Manejo de errores global (opcional, profesional) ---
    window.onerror = function(msg, url, line, col, error) {
        mostrarToast("Ha ocurrido un error inesperado. Por favor, recarga la página o contacta soporte.", "error");
        logError("Error global capturado", { msg, url, line, col, error });
        return false;
    };

    // --- Animación de aparición/desaparición para secciones ---
    function fadeInSection(section) {
        if (!section) return;
        section.style.opacity = 0;
        section.style.display = 'block';
        section.style.transform = "translateY(30px)";
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s, transform 0.5s';
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }, 10);
    }
    function fadeOutSection(section) {
        if (!section) return;
        section.style.transition = 'opacity 0.4s, transform 0.4s';
        section.style.opacity = 0;
        section.style.transform = "translateY(30px)";
        setTimeout(() => {
            section.style.display = 'none';
        }, 400);
    }

    // --- Restaurar funcionalidad de navegación de botones principales ---
    if (btnDestinos) {
        btnDestinos.onclick = () => {
            fadeOutSection(hero);
            setTimeout(() => {
                fadeInSection(destinos);
                infoDestino.innerHTML = "";
            }, 400);
        };
    }
    if (btnVolverDestinos) {
        btnVolverDestinos.onclick = () => {
            fadeOutSection(destinos);
            setTimeout(() => {
                fadeInSection(hero);
            }, 400);
        };
    }
    if (btnReservar) {
        btnReservar.onclick = () => {
            fadeOutSection(hero);
            setTimeout(() => {
                fadeInSection(reserva);
                mostrarCalendario();
                valorViaje.innerHTML = "";
                actualizarHoteles();
            }, 400);
        };
    }
    if (btnVolverReserva) {
        btnVolverReserva.onclick = () => {
            fadeOutSection(reserva);
            setTimeout(() => {
                fadeInSection(hero);
            }, 400);
        };
    }
    if (btnVolverMensaje) {
        btnVolverMensaje.onclick = () => {
            fadeOutSection(mensajeReserva);
            setTimeout(() => {
                fadeInSection(reserva);
            }, 400);
        };
    }

    // --- Restaurar funcionalidad de navegación del menú principal ---
    const menuLinks = document.querySelectorAll('nav ul li a');
    menuLinks.forEach(link => {
        link.onclick = function(e) {
            e.preventDefault();
            const texto = link.textContent.trim();

            // Ocultar todas las secciones principales
            if (hero) { hero.style.display = 'none'; hero.style.opacity = 0; }
            if (destinos) { destinos.style.display = 'none'; destinos.style.opacity = 0; }
            if (reserva) { reserva.style.display = 'none'; reserva.style.opacity = 0; }
            if (mensajeReserva) { mensajeReserva.style.display = 'none'; mensajeReserva.style.opacity = 0; }
            // Ocultar secciones adicionales si existen
            const seccionPromociones = document.getElementById('seccionPromociones');
            const seccionContacto = document.getElementById('seccionContacto');
            if (seccionPromociones) seccionPromociones.style.display = 'none';
            if (seccionContacto) seccionContacto.style.display = 'none';

            // Mostrar la sección correspondiente según el botón
            if (texto === "Inicio") {
                if (hero) {
                    hero.style.display = 'block';
                    setTimeout(() => { hero.style.opacity = 1; }, 10);
                }
            } else if (texto === "Destinos") {
                if (destinos) {
                    destinos.style.display = 'block';
                    setTimeout(() => { destinos.style.opacity = 1; }, 10);
                    if (infoDestino) infoDestino.innerHTML = "";
                }
            } else if (texto === "Promociones") {
                if (seccionPromociones) {
                    seccionPromociones.style.display = 'block';
                    setTimeout(() => { seccionPromociones.style.opacity = 1; }, 10);
                }
            } else if (texto === "Contacto") {
                if (seccionContacto) {
                    seccionContacto.style.display = 'block';
                    setTimeout(() => { seccionContacto.style.opacity = 1; }, 10);
                }
            }
        };
    });

    // --- Modal de consulta de reservas ---
    if (menuReservas) {
        menuReservas.onclick = function(e) {
            e.preventDefault();
            modalConsultaReserva.style.display = "flex";
            resultadoReserva.innerHTML = "";
            inputCedulaConsulta.value = "";
        };
    }
    if (cerrarModalReserva) {
        cerrarModalReserva.onclick = function() {
            modalConsultaReserva.style.display = "none";
        };
    }
    if (btnBuscarReserva) {
        btnBuscarReserva.onclick = function() {
            const cedula = inputCedulaConsulta.value.trim();
            if (!cedula) {
                resultadoReserva.innerHTML = '<span style="color:#e63946;">Ingrese una cédula válida.</span>';
                return;
            }
            let reservas = [];
            try {
                reservas = JSON.parse(localStorage.getItem('todasReservas')) || [];
            } catch (e) { reservas = []; }
            // Buscar reservas donde la cédula principal o de algún viajero coincida
            const reservasEncontradas = reservas.filter(r =>
                r.cedula === cedula ||
                (Array.isArray(r.personasDetalles) && r.personasDetalles.some(p => p.cedula === cedula))
            );
            if (reservasEncontradas.length === 0) {
                resultadoReserva.innerHTML = '<span style="color:#e63946;">No se encontró ninguna reserva para esa cédula.</span>';
                return;
            }
            resultadoReserva.innerHTML = reservasEncontradas.map(r => {
                // Mostrar todos los viajeros, incluyendo el titular
                let viajeros = '';
                let todosViajeros = [];
                // Agregar titular
                todosViajeros.push({
                    nombre: r.nombre,
                    apellido: '', // El titular no tiene apellido separado
                    cedula: r.cedula,
                    fechaNacimiento: r.fechaNacimiento,
                    telefono: r.telefono,
                    email: r.email,
                    esTitular: true
                });
                // Agregar acompañantes si existen
                if (Array.isArray(r.personasDetalles) && r.personasDetalles.length > 0) {
                    r.personasDetalles.forEach(p => {
                        todosViajeros.push({
                            ...p,
                            esTitular: false
                        });
                    });
                }
                viajeros = `
                    <div style="margin-top:10px;">
                        <b>Viajeros:</b>
                        <ul style="padding-left:18px;">
                            ${todosViajeros.map((p, idx) => `
                                <li>
                                    <b>${p.nombre}${p.apellido ? ' ' + p.apellido : ''}${p.esTitular ? ' (Titular)' : ''}</b> - Cédula: ${p.cedula}<br>
                                    Nacimiento: ${p.fechaNacimiento} | Tel: ${p.telefono} | Email: ${p.email}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
                return `
                    <div style="border:1px solid #eee;padding:12px 10px;border-radius:8px;margin-bottom:16px;">
                        <b>Reserva a nombre de:</b> ${r.nombre} (${r.email})<br>
                        <b>Cédula:</b> ${r.cedula}<br>
                        <b>Destino:</b> ${r.destino} | <b>Hotel:</b> ${r.hotel} | <b>Aerolínea:</b> ${r.aerolinea}<br>
                        <b>Tipo de viaje:</b> ${r.tipoViaje === 'idaVuelta' ? 'Ida y vuelta' : 'Solo ida'}<br>
                        <b>Fecha ida:</b> ${r.fecha} ${r.horaViaje ? 'Hora: ' + r.horaViaje : ''}<br>
                        ${r.fechaVuelta ? `<b>Fecha vuelta:</b> ${r.fechaVuelta}<br>` : ""}
                        <b>Días:</b> ${r.dias} | <b>Personas:</b> ${r.personas}<br>
                        <b>Valor total:</b> $${r.valor} USD
                        ${viajeros}
                    </div>
                `;
            }).join('');
        };
    }
    // Cerrar modal al hacer click fuera del contenido
    if (modalConsultaReserva) {
        modalConsultaReserva.addEventListener('click', function(e) {
            if (e.target === modalConsultaReserva) {
                modalConsultaReserva.style.display = "none";
            }
        });
    }

    // --- PROFESIONAL: Mejoras de experiencia y accesibilidad ---
    document.addEventListener("DOMContentLoaded", function() {
        // --- Accesibilidad: Cerrar modal con ESC y enfocar input al abrir ---
        if (modalConsultaReserva) {
            document.addEventListener('keydown', function(e) {
                if (modalConsultaReserva.style.display === "flex") {
                    if (e.key === "Escape") {
                        modalConsultaReserva.style.display = "none";
                    }
                    if (e.key === "Tab") {
                        // Mantener el foco dentro del modal
                        const focusables = modalConsultaReserva.querySelectorAll('input,button');
                        const first = focusables[0];
                        const last = focusables[focusables.length - 1];
                        if (e.shiftKey && document.activeElement === first) {
                            last.focus();
                            e.preventDefault();
                        } else if (!e.shiftKey && document.activeElement === last) {
                            first.focus();
                            e.preventDefault();
                        }
                    }
                }
            });
            menuReservas && menuReservas.addEventListener('click', function() {
                setTimeout(() => { inputCedulaConsulta && inputCedulaConsulta.focus(); }, 300);
            });
        }

        // --- UX: Mostrar/ocultar campo de fecha de vuelta según tipo de viaje ---
        if (tipoViaje && campoFechaVuelta) {
            tipoViaje.addEventListener('change', function() {
                if (tipoViaje.value === 'idaVuelta') {
                    campoFechaVuelta.style.display = '';
                    fechaVuelta && (fechaVuelta.required = true);
                } else {
                    campoFechaVuelta.style.display = 'none';
                    fechaVuelta && (fechaVuelta.required = false);
                }
            });
            // Inicializar visibilidad
            if (tipoViaje.value === 'idaVuelta') {
                campoFechaVuelta.style.display = '';
                fechaVuelta && (fechaVuelta.required = true);
            } else {
                campoFechaVuelta.style.display = 'none';
                fechaVuelta && (fechaVuelta.required = false);
            }
        }

        // --- UX: Validar fechas de ida y vuelta en tiempo real ---
        if (fechaViaje && fechaVuelta) {
            fechaViaje.addEventListener('change', function() {
                if (fechaVuelta.value && fechaViaje.value > fechaVuelta.value) {
                    mostrarToast("La fecha de vuelta debe ser posterior a la de ida.", "error");
                    fechaVuelta.classList.add('input-error');
                } else {
                    fechaVuelta.classList.remove('input-error');
                }
            });
            fechaVuelta.addEventListener('change', function() {
                if (fechaViaje.value && fechaViaje.value > fechaVuelta.value) {
                    mostrarToast("La fecha de vuelta debe ser posterior a la de ida.", "error");
                    fechaVuelta.classList.add('input-error');
                } else {
                    fechaVuelta.classList.remove('input-error');
                }
            });
        }

        // --- UX: Calcular valor automáticamente al cambiar días/personas ---
        if (diasViaje) diasViaje.addEventListener('input', calcularValor);
        if (personasViaje) personasViaje.addEventListener('input', calcularValor);

        // --- UX: Limpiar info destino al volver a destinos ---
        if (btnVolverDestinos && infoDestino) {
            btnVolverDestinos.addEventListener('click', function() {
                infoDestino.innerHTML = "";
            });
        }

        // --- UX: Mejor feedback visual en selects y campos requeridos ---
        [selectDestino, hotelReserva, tipoViaje, diasViaje, personasViaje].forEach(el => {
            if (el) {
                el.addEventListener('invalid', function() {
                    el.classList.add('input-error');
                });
                el.addEventListener('input', function() {
                    el.classList.remove('input-error');
                });
            }
        });

        // --- UX: Mejorar experiencia en modales y formularios ---
        // Enfocar primer input en formularios modales
        if (modalConsultaReserva) {
            modalConsultaReserva.addEventListener('transitionend', function() {
                if (modalConsultaReserva.style.display === "flex") {
                    const firstInput = modalConsultaReserva.querySelector('input');
                    firstInput && firstInput.focus();
                }
            });
        }

        // --- UX: Mostrar spinner en búsqueda de reservas ---
        if (btnBuscarReserva && resultadoReserva) {
            btnBuscarReserva.addEventListener('click', function() {
                resultadoReserva.innerHTML = '';
                mostrarSpinner();
                setTimeout(() => {
                    ocultarSpinner();
                    // ...existing code for búsqueda de reservas...
                    // (No duplicar, solo dejar el código original aquí)
                }, 600);
            });
        }

        // --- UX: Mejorar feedback al cerrar formularios de personas ---
        // (Ya implementado en crearFormularioPersonas)

        // --- UX: Animación de scroll al mostrar formularios principales ---
        function scrollToSection(section) {
            if (section && section.scrollIntoView) {
                setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
            }
        }
        [reserva, destinos, hero].forEach(sec => {
            if (sec) {
                sec.addEventListener('transitionend', function() {
                    if (sec.style.display === 'block' && sec.style.opacity === '1') {
                        scrollToSection(sec);
                    }
                });
            }
        });

        // --- UX: Mejorar experiencia de usuario en botones del modal de confirmación ---
        // (Ya implementado en mostrarModalConfirmacion)

        // --- UX: Mejorar experiencia en tooltips para accesibilidad ---
        document.querySelectorAll('[title]').forEach(el => {
            el.setAttribute('tabindex', '0');
            el.addEventListener('focus', function() {
                el.setAttribute('data-tooltip', el.getAttribute('title'));
            });
            el.addEventListener('blur', function() {
                el.removeAttribute('data-tooltip');
            });
        });
    });
});
