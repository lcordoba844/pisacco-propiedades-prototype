// Formatea un numero a moneda argentina.
export const formatPrice = (price: number | string): string => {
  const numericPrice = typeof price === 'string' ? Number(price) : price;
  if (isNaN(numericPrice)) return '0';
  return numericPrice.toLocaleString('es-AR');
};

// Toma un numero de UUID y lo corta para tener una referencia real presentable en el front.
export const formatPropertyRef = (id: string): string => {
  if (!id) return '';
  return `REF_${id.split('-')[0].toUpperCase()}`;
};
