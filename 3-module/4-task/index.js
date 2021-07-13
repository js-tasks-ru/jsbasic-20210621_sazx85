
function showSalary(arr, age) {
  let someUsers = arr.filter(item => item.age <= age);

  let result = someUsers.map(item => `${item.name}, ${item.balance}`);

  return result.join("\n");
}
