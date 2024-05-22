function formatPhoneNumber(number) {
  // Memastikan input adalah string dan memiliki panjang minimal 10 karakter
  if (typeof number !== 'string' || number.length < 10) {
    return number;
  }

  // Menghapus semua karakter non-digit
  const cleanedNumber = number.replace(/\D/g, '');

  // Mengubah awalan 0 menjadi 62 jika ada
  let formattedNumber;
  if (cleanedNumber.startsWith('0')) {
    formattedNumber = `62${cleanedNumber.slice(1)}`;
  } else {
    formattedNumber = cleanedNumber;
  }

  // Memastikan nomor memiliki panjang yang sesuai
  if (formattedNumber.length < 11 || formattedNumber.length > 14) {
    return number;
  }

  // Menambahkan tanda kurung dan strip sesuai format
  return `(+${formattedNumber.slice(0, 2)}) ${formattedNumber.slice(2, 5)}-${formattedNumber.slice(
    5,
    9
  )}-${formattedNumber.slice(9)}`;
}

export default formatPhoneNumber;
