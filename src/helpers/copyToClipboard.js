import successSwal from "./successSwal";
const copyToClipboard = (target, message) => {
  // Buat elemen textarea yang tidak terlihat
  const textarea = document.createElement("textarea");
  textarea.value = target;
  // Menambahkan elemen ke DOM
  document.body.appendChild(textarea);

  // Memilih teks dalam elemen textarea
  textarea.select();

  // Menyalin teks ke clipboard
  document.execCommand("copy");

  // Menghapus elemen textarea
  document.body.removeChild(textarea);

  // Tampilkan pesan sukses (opsional)
  return successSwal(message || "Copy to clipboard");
};

export default copyToClipboard;
