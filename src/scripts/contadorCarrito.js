$(document).ready(function () {
  actualizarContador();
  // para probar borramos la data persistente
  //   sessionStorage.removeItem("numProductos");
});

$(".btn-agregar-producto").click(function () {
  agregarProducto();
  actualizarContador();
  animarContador();
});

function agregarProducto() {
  let numProductos = sessionStorage.getItem("numProductos");

  if (numProductos == null) {
    numProductos = 1;
  } else {
    numProductos = parseInt(numProductos) + 1;
  }

  sessionStorage.setItem("numProductos", numProductos);
}

function actualizarContador() {
  let numProductos = sessionStorage.getItem("numProductos");

  if (numProductos == null) {
    numProductos = 0;
  }

  $("#contadorCarrito").text(numProductos);

  if (numProductos == 0) {
    $("#contadorCarrito").css("display", "none");
  } else {
    $("#contadorCarrito").css("display", "block");
  }
}

function animarContador() {
  let contador = $("#contadorCarrito");
  contador.animate({top:"22px"}, 150);
  contador.animate({top:"25px"}, 100);
}