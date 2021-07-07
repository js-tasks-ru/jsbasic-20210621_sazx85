function camelize(str) {
  let arr = str.split("-");

  let result = arr.map(function(item, index, array) {
    if (index === 0) {
      return item;
    }

    return item[0].toUpperCase() + item.slice(1);
  });

  return result.join("");
}
