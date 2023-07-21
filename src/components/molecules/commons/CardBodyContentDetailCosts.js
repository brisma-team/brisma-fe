import { convertToRupiah } from "@/helpers";

const Content = ({ title, cost }) => {
  return (
    <div className="flex text-sm my-1">
      <div className="w-1/2 pl-5">{title}</div>
      <div className="w-1/2">{cost}</div>
    </div>
  );
};

const CardBodyContentDetailCost = ({ title, totalCost, detailCost }) => {
  return (
    <>
      <div className="font-bold text-base">{title}</div>
      <div className="flex text-sm font-semibold my-3">
        <div className="w-1/2">{totalCost.title}</div>
        <div className="w-1/2">{convertToRupiah(totalCost.cost)}</div>
      </div>
      {detailCost.map((v, i) => {
        return (
          <Content key={i} title={v.title} cost={convertToRupiah(v.cost)} />
        );
      })}
    </>
  );
};

export default CardBodyContentDetailCost;
