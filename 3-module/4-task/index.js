
function showSalary(arr, age) {
  let someUsers = arr.filter(item => item.age <= age);

  let result = someUsers.map(function(item, index, array) {
    return `${item.name}, ${item.balance}`;
  });

  return result.join("\n");
}
