
document.addEventListener("DOMContentLoaded", () => {
  new Tabulator("#contracts-table", {
    data: contracts,
    layout: "fitColumns",
	pagination: "local",
    paginationSize: 25,
    paginationSizeSelector: [25, 50, 100, 200],
    columns: [
      { title: "ID", field: "id", hozAlign: 'center' },
      { title: "Origen", field: "origen", headerFilter: 'input', hozAlign: 'center' },
      { title: "Estado", field: "estado", headerFilter: 'input', hozAlign: 'center' },
      { title: "Cupón", field: "cupon", headerFilter: 'input', hozAlign: 'center' },
    ],
  });
});
