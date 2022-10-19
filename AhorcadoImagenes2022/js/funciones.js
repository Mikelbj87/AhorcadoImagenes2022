//funcion para elegir las imagenes dentro de una carpeta del proyecto, habre una ventana emergente donde nos da la opcion
//de elegir las imagenes con las que queremos jugar
function SeleccionImagenes(evt) {

    //creamos el objeto tipo file, en el que guardaremos la carpeta con las imagenes a las que daremos opcion al usuario
    //a seleccionarlas para jugar
    var files = evt.target.files; 
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Function(Clousure) que obtiene la información de cada archivo. la funcion 
        // se ejecuta al cargar (load) cada uno de los archivos seleccionados
        reader.onload = (function (ElFichero) {
            return function (e) {     
                let cadena = escape(ElFichero.name);
                let ppunto = cadena.indexOf(".");
                let nimagen = cadena.substring(0, ppunto)
                let imm = document.createElement("img");
                // LA IMAGEN EN FORMATO BASE64
                imm.src = e.target.result;
                //escape(ElFichero.name);
                imm.alt = ElFichero.name;
                imm.title = nimagen;
                imm.onclick = copiaPalabra;
                document.getElementById('contenedor').insertBefore(imm, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}
//evento que se manda al input con id files en index.html, es decir para elegir las fotos con las que queremos jugar, y que
//llama a la funcion de SeleccionImagenes
document.getElementById('files').addEventListener('change', SeleccionImagenes, false);
//creamos dos variables, una palabra donde guardamos la palabra del titulo de la foto, y la otra asteriscos donde
//tambien guardamos la palabra del titulo pero sustituida por asteriscos
let palabra; let asteriscos;
//funcion copiaPalabra, donde palabra contiene el titulo de la foto y asteriscos tambien, pero en vez de en letras en asteriscos
function copiaPalabra() {
    //guardamos en las variables asteriscos y palabra el titulo de la foto seleccionada
    asteriscos = this.title;
    palabra=this.title;
    //la palabra que contiene asteriscos la sustituimos metiante el metodo .replace en asteriscos en vez de letras
    asteriscos = asteriscos.replace(/[a-z]/gi, "*");
    //volcamos el contenido de asteriscos en la caja de aciertos
    Aciertos.value = asteriscos;
}
//evento que compara los caracteres que introducimos en la segunda caja, con los del titulo de la foto 
caracter.addEventListener("keyup", buscaCaracter, false);
//funcion buscarCaracter, ya la utilizamos en el juego normal del ahorcado, 
//solo que ahora funciona con los nombres de las fotos
function buscaCaracter() {
        //tiene que haber al menos un caracter escrito si no esta en bucle esperando
        if (caracter.value == "") {
            return
        };
        //instanciamos la variable carcaterbuscar a la que damos el contenido del caracter que introducimos por teclado,
        //y lo transformamos en mayusculas
        var carcaterbuscar = caracter.value.toUpperCase();
        //instanciamos la variable palabraA a la que damos el titulo de la foto que se selecciona, y la transformamos a mayusculas
        var palabraA = palabra.toUpperCase();
        //instanciamos la variable posicion, a la que damos el valor del indice de la letra que queremos comprobar, dentro 
        //del titulo de la foto
        var posicion = palabraA.indexOf(carcaterbuscar);
        //instanciamos variable booleana es_acierto que la iniciamos en false
        var es_acierto = false;
        //si posicion es -1 no entra al bucle, si encuentra un caracter si entra
        while (posicion > -1) {
            //sustituimos la variable asteriscos, que esta llena con el mismo numero de asteriscos que el titulo de la foto
            //por asteriscos mas la letra acertada introducida a mano guardada en la variable carcaterbuscar y seguimos poniendo
            //asteriscos hasta acabar la palabra del titulo
            asteriscos = asteriscos.substring(0, posicion) + carcaterbuscar + asteriscos.substr(posicion + 1, asteriscos.length);
            //guardamos el valor de la variable asteriscos dentro de la caja de los aciertos
            Aciertos.value = asteriscos;
            //buscar si hay más de una letra en la palabra
            posicion = palabraA.indexOf(carcaterbuscar, posicion + 1);
             //si encuentra alguna sigue true
            es_acierto = true;
        }
        //si la letra introducida no es la acertada mostraremos los fallos demtro de la etiqueta span que contiene el id fallos
        if (!es_acierto) {
            alert("Error")
            fallos.innerHTML = fallos.innerHTML + carcaterbuscar;
        }
        caracter.value = "";
    }