document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
    scrollNav();

    navegacionFija();
});

function navegacionFija(){

    const barra = document.querySelector('.header'); 
    /* registrar el intersection observer*/

    const observer = new IntersectionObserver( function(entries){
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo');
        } else {
            barra.classList.add('fijo');
        }
    });

    /* elemento a observar */
    observer.observe(document.querySelector('.sobre-festival'));
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( function(enlace){
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({
                behavior:'smooth',
            });
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes'); 

    for(let i = 1; i <=12; i++){
        const imagen = document.createElement ('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        /* añadir funcion mostrarImagen */
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    /* obtenemos el numero de id de la imagen 
    y como este es un string lo pasamos a número, usando parseint() */

    const id = parseInt(e.target.dataset.imagenId);
/* generamos imagen en grande */
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;
    
    /* hacemos que la nueva imagen aparzca en frente y grande */
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    /* boton para cerrar la imagen */
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    overlay.appendChild(cerrarImagen);

    /* funcionalidad del btn cerrar imagen */
    cerrarImagen.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.onclick = function() {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    /* mostrarlo en el html */
    const body =document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}