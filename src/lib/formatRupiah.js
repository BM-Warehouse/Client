/* eslint-disable no-restricted-globals */
function formatRupiah(number) {
  if (isNaN(number)) {
    return 'Invalid number';
  }

  // Memisahkan ribuan dengan menambahkan titik setiap 3 digit dari belakang
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Menghasilkan format Rupiah dengan menambahkan "Rp." di depan
  return `Rp. ${parts.join(',')}`;
}

export default formatRupiah;
