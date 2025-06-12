
document.addEventListener("DOMContentLoaded", () => {
  new Tabulator("#example-table", {
    data: contracts, // <-- datos desde el backend
    layout: "fitColumns",
    columns: [
      { title: "ID", field: "id" },
      { title: "Origen", field: "origen" },
      { title: "Estado", field: "estado" },
      { title: "Cupón", field: "cupon" },
    ],
  });
});