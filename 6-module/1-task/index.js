import createElement from '../../assets/lib/create-element.js';
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
    this.elem = this.createTable();
  }

  createTable() {
    let table = createElement(`
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    `);

    this._rows.forEach(element => {
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

  createButton () {
    let cell = document.createElement('td');
    let button = createElement('<button>X</button>');

    cell.append(button);

    button.addEventListener('click', function () {
      this.closest('tr').remove();
    });

    return cell;
  }

}
