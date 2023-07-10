export default function convertToRupiah(num) {
  return "Rp. " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",-";
}
