const { convertToRupiah } = require("@/helpers");

const CardCostDetail = ({ title, cost }) => {
  return (
    <div className="flex text-sm my-1">
      <div className="w-2/3 pl-5">{title}</div>
      <div className="w-1/3">Rp. {convertToRupiah(cost)}</div>
    </div>
  );
};

export default CardCostDetail;
