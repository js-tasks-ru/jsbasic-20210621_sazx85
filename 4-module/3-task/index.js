function highlight(table) {
  let tbody = table.tBodies[0];
  let rows = tbody.rows;

  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;
    let available = false;
    let unavailable = false;

    for (let j = 0; j < cells.length; j++) {
      let cell = rows[i].cells[j];

      if (cell.dataset.available === "true") {
        available = true;
      } else if (cell.dataset.available === "false") {
        unavailable = true;
      }

      if (cell.innerHTML === "m") {
        rows[i].classList.add('male');
      }
      
      if (cell.innerHTML === "f") {
        rows[i].classList.add('female');
      }
      
      if (isFinite(cell.innerHTML) && cell.innerHTML < 18) {
        rows[i].style.textDecoration = "line-through";
      }
    }

    if (available) {
      rows[i].classList.add('available');
    } else if (unavailable) {
      rows[i].classList.add('unavailable');
    } else {
      rows[i].hidden = true;
    }
  }
}
