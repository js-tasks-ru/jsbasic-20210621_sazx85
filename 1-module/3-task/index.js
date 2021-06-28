function ucFirst(str) {
  if (str.length === 1 || str.length === 0) {
    return str.toUpperCase();
  }

  return str[0].toUpperCase() + str.slice(1, str.length);
}
