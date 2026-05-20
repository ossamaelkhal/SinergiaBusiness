/**
 * Valida um número de CNPJ (Cadastro Nacional da Pessoa Jurídica).
 * @param {string} cnpj - O CNPJ a ser validado.
 * @returns {boolean} - Retorna true se o CNPJ é válido, false caso contrário.
 */
export function isValidCNPJ(cnpj) {
  if (!cnpj) return false;

  // Remove caracteres não numéricos
  const cnpjOnlyNumbers = cnpj.replace(/[^\d]+/g, '');

  // CNPJ deve ter 14 dígitos
  if (cnpjOnlyNumbers.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos (todos os dígitos iguais)
  if (/^(\d)\1+$/.test(cnpjOnlyNumbers)) return false;

  // Validação dos dígitos verificadores
  let length = cnpjOnlyNumbers.length - 2;
  let numbers = cnpjOnlyNumbers.substring(0, length);
  const digits = cnpjOnlyNumbers.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;

  length = length + 1;
  numbers = cnpjOnlyNumbers.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;

  return true;
}
