export default function convertToRupiah(num) {
  return num ? num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
}
