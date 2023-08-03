import { convertToRupiah } from "@/helpers";
import CardCostDetail from "./CardCostDetail";

const CardActivityExpense = ({ data }) => {
  const sumTotalAmount = (value) => {
    const totalAmount = value?.reduce(
      (acc, current) => acc + parseInt(current.amount),
      0
    );
    return totalAmount;
  };

  console.log("data => ", data);
  return data.length
    ? data.map((v, i) => {
        return (
          <div key={i}>
            <div className="flex my-3">
              <div className="w-2/3">
                <div className="text-sm font-semibold">{v.nama}</div>
              </div>
              <div className="w-1/3 text-sm font-semibold">
                Rp.{" "}
                {convertToRupiah(sumTotalAmount(v.ref_sub_kategori_anggarans))}
              </div>
            </div>
            {v.ref_sub_kategori_anggarans.map((x, i) => {
              return (
                <CardCostDetail
                  key={i}
                  title={
                    x?.ref_sub_kategori_anggaran_kode
                      ?.ref_sub_kategori_anggaran_name
                  }
                  cost={x.amount}
                />
              );
            })}
          </div>
        );
      })
    : "";
};

export default CardActivityExpense;
