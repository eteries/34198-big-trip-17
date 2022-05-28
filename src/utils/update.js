const updateItem = (updatedItem, items) => {
  const index = items.findIndex(({id}) => id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [items.slice(0, index), updatedItem, items.slice(index + 1, items.length - 1)];
};

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

export { addItem, removeItem, updateItem };
