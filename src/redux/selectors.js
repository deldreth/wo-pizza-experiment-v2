export function calculateTotal(pizzas) {
  return (
    Object.values(pizzas)
      .reduce((acc, cur) => (acc += cur.price), 0)
      .toFixed(2) || 0
  );
}
