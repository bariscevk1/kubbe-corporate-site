/** Türkiye cep: 05xx… → tel:+90 ve wa.me için rakamlar */
export function digitsOnly(s: string) {
  return s.replace(/\D/g, '');
}

export function telHrefTr(phone: string) {
  const d = digitsOnly(phone).replace(/^0/, '');
  return `tel:+90${d}`;
}

export function waHrefTr(phone: string) {
  const d = digitsOnly(phone).replace(/^0/, '');
  return `https://wa.me/90${d}`;
}

/** Basit gösterim: 0532 323 66 27 */
export function formatPhoneDisplay(phone: string) {
  const d = digitsOnly(phone);
  if (d.length === 11 && d.startsWith('0')) {
    return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
  }
  return phone;
}
