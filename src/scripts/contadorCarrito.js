$(document).ready(function () {
  actualizarContador();
  // para probar borramos la data persistente
  //   sessionStorage.removeItem("numProductos");
});

$(".btn-agregar-producto").click(function () {
  agregarProducto();
  actualizarContador();
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
