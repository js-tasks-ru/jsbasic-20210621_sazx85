function makeFriendsList(friends) {
  let list = document.createElement('ul');

  for (let item of friends) {
    let listItem = document.createElement('li');
    listItem.innerHTML = `${item.firstName} ${item.lastName}`;
    list.append(listItem);
  }

  return list;
}
