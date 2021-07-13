function getMinMax(str) {
  let arr = str.split(",");
  let arr3 = [];
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split(" ");

    for (let j = 0; j < arr2.length; j++) {
      arr3.push(arr2[j]);
    }
  }

  for (let item of arr3) {
    if (isFinite(item)) {
      result.push(item);
    }
  }

  result.sort((a, b) => a - b);

  return {
    min: Number(result[0]),
    max: Number(result[result.length - 1])
  };
}
