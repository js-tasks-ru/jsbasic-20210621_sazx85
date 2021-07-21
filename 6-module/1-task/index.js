/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {

  constructor(rows) {
    this._rows = rows;
  }

  createTable() {
    let table = this.createTableHeader();
    let m = this._rows;

    m.forEach(element => {
      let tr = document.createElement('tr');
      for (let key in element) {
        let td = document.createElement('td');
        td.innerText = element[key];
        tr.append(td);
      }
      tr.append(this.createButton());
      table.tBodies[0].append(tr);
    });

    return table;
  }

  createTableHeader () {
    let tableHeader = document.createElement('table');
    tableHeader.innerHTML = `<thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      </tbody>`;

    return tableHeader;
  }

  createButton () {
    let cell = document.createElement('td');
    let button = document.createElement('button')

    button.innerHTML = 'X';
    cell.append(button);

    button.addEventListener('click', function () {
      this.closest('tr').remove();
    })

    return cell;
  }

  get elem() {
    return this.createTable();
  }

}

