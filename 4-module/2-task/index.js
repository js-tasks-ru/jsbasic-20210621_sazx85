function makeDiagonalRed(table) {
  let tr = table.querySelectorAll('tr');

  for (let i = 0; i < tr.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
