const boldStringMaker = (searchInput: string, itemName: string) => {
  if (searchInput === '') return itemName;

  const firstIndex = itemName.toLowerCase().indexOf(searchInput.toLowerCase());
  const secondIndex = searchInput.length;

  if (firstIndex === -1 || secondIndex === -1) return itemName;

  const firstPart = itemName.slice(0, firstIndex);
  const middlePart = itemName.slice(firstIndex, firstIndex + secondIndex);
  const lastPart = itemName.slice(firstIndex + secondIndex);

  return firstPart + `<b>${middlePart}</b>` + lastPart;
};

export default boldStringMaker;
