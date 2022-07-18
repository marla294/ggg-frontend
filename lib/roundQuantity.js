// round quantity to nearest 1 decimal place
export default function roundQuantity(quantity = 0) {
  // no decimal place
  if ((quantity * 10) % 10 === 0) {
    return quantity;
  }

  return Math.round(quantity * 10) / 10;
}
