const removeItem = (item, items) => {
  const newItems = [...items];
  const index = newItems.findIndex((current) => current === item);
  if (index > -1) {
    newItems.splice(index, 1);
  }

  return newItems;
};

const addItem = (item, items) => {
  const newItems = [...items];
  newItems.push(item);
  return newItems;
};

export { addItem, removeItem };
