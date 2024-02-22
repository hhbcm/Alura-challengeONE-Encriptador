let contenedorResultado = document.getElementById("contenedor-resultado");
let textoModificado = document.getElementById("texto-modificado");
let contenedorImagen = document.getElementById("contenedor-imagen");
let nuevoTextoEncriptado = "";
let textoDesencriptado = "";
let textoNuevoD = "";

function encriptar(texto) {
  let nuevoTextoEncriptado = "";

  for (let i = 0; i < texto.length; i++) {
    let letra = texto[i];

    switch (letra) {
      case "a":
        nuevoTextoEncriptado += "ai";
        break;
      case "e":
        nuevoTextoEncriptado += "enter";
        break;
      case "i":
        nuevoTextoEncriptado += "imes";
        break;
      case "o":
        nuevoTextoEncriptado += "ober";
        break;
      case "u":
        nuevoTextoEncriptado += "ufat";
        break;
      default:
        nuevoTextoEncriptado += letra;
    }
  }

  return nuevoTextoEncriptado;
}

function desencriptar(textoEncriptado) {
  let textoDesencriptado = "";

  for (let i = 0; i < textoEncriptado.length; i++) {
    let letra = textoEncriptado[i];

    switch (letra) {
      case "a":
        if (textoEncriptado[i + 1] === "i") {
          letra = "a";
          i++;
        }
        break;
      case "e":
        if (textoEncriptado.substring(i, i + 5) === "enter") {
          letra = "e";
          i += 4;
        }
        break;
      case "i":
        if (textoEncriptado.substring(i, i + 4) === "imes") {
          letra = "i";
          i += 3;
        }
        break;
      case "o":
        if (textoEncriptado.substring(i, i + 4) === "ober") {
          letra = "o";
          i += 3;
        }
        break;
      case "u":
        if (textoEncriptado.substring(i, i + 4) === "ufat") {
          letra = "u";
          i += 3;
        }
        break;
    }

    textoDesencriptado += letra;
  }

  return textoDesencriptado;
}

function actualizarTexto() {
  let textoIngresado = document.getElementById("texto").value;
  // Validar el texto antes de continuar
  if (!validarTexto(textoIngresado)) {
    return;
  }
  let textoModificado = encriptar(textoIngresado);

  if (textoModificado !== "") {
    document.getElementById("texto-modificado").value = textoModificado;
    document.getElementById("contenedor-resultado").style.display = "block";
    document.getElementById("contenedor-imagen").style.display = "none";
  } else {
    document.getElementById("contenedor-imagen").style.display = "block";
    document.getElementById("contenedor-resultado").style.display = "none";
  }
}

function actualizarDesencriptado() {
  let textoEncriptado = document.getElementById("texto").value;

  // Validar el texto encriptado antes de continuar
  if (!validarTexto(textoEncriptado)) {
    return;
  }

  let textoDesencriptado = desencriptar(textoEncriptado);

  if (textoDesencriptado !== "") {
    document.getElementById("texto-modificado").value = textoDesencriptado;
    document.getElementById("contenedor-resultado").style.display = "block";
    document.getElementById("contenedor-imagen").style.display = "none";
  } else {
    document.getElementById("contenedor-imagen").style.display = "block";
    document.getElementById("contenedor-resultado").style.display = "none";
  }
}

function mostrarMensajeError(mensaje) {
  // Crear un nuevo contenedor div
  var mensajeErrorContainer = document.createElement("div");
  mensajeErrorContainer.id = "mensajeErrorContainer"; // Asignar un ID para aplicar el estilo

  // Crear un nuevo elemento div para el mensaje de error
  var mensajeError = document.createElement("div");
  mensajeError.id = "mensajeError"; // Asignar un ID para aplicar el estilo

  // Agregar el mensaje de error al div
  mensajeError.innerHTML = mensaje;

  // Crear un botón de cerrar
  var cerrarBtn = document.createElement("span");
  cerrarBtn.innerHTML = "&times;"; // Utilizar el símbolo 'x' para representar el botón de cerrar
  cerrarBtn.id = "cerrarBtn"; // Asignar un ID para aplicar el estilo
  cerrarBtn.onclick = function () {
    // Al hacer clic en el botón de cerrar, eliminar el contenedor del mensaje de error
    document.body.removeChild(mensajeErrorContainer);
  };

  // Agregar el botón de cerrar al div del mensaje de error
  mensajeError.appendChild(cerrarBtn);

  // Agregar el mensaje de error al contenedor
  mensajeErrorContainer.appendChild(mensajeError);

  // Agregar el nuevo contenedor al cuerpo del documento
  document.body.appendChild(mensajeErrorContainer);
}

function validarTexto(texto) {
  // Verificar si hay mayúsculas
  if (/[A-ZÁÉÍÓÚÜÑ]/.test(texto)) {
    mostrarMensajeError(
      "No se admiten mayúsculas ni acentos. Introduzca solo letras minúsculas sin acentos."
    );
    return false;
  }

  // Verificar caracteres especiales
  if (/[^a-z\s]/i.test(texto)) {
    mostrarMensajeError(
      "No se admiten caracteres especiales. Introduzca solo letras minúsculas sin acentos."
    );
    return false;
  }

  // Devolver true si la validación es exitosa
  return true;
}

function copiar() {
  let textoIngresadoCopiado = document.getElementById("texto-modificado");

  // Selecciona el contenido del área de texto
  textoIngresadoCopiado.select();

  // Ejecuta el comando de copia en el documento
  document.execCommand("copy");

  // Desselecciona el texto
  window.getSelection().removeAllRanges();
}
