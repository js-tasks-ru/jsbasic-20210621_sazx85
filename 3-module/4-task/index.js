function showSalary(arr, age) {
  let str = [];

  for (let value of arr) {
    if ( value.age <= age ) {
      str.push(`${value.name}, ${value.balance}`);
    }
  }

  return str.join("\n");
}
