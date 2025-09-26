export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj) return false;
  const cnpjOnlyNumbers = cnpj.replace(/[^\d]+/g, '');
  if (cnpjOnlyNumbers.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpjOnlyNumbers)) return false;

  let length = cnpjOnlyNumbers.length - 2;
  let numbers = cnpjOnlyNumbers.substring(0, length);
  const digits = cnpjOnlyNumbers.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cnpjOnlyNumbers.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
}
