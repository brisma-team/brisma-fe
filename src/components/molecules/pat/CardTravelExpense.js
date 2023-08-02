import { convertToRupiah } from "@/helpers";
import CardCostDetail from "./CardCostDetail";

const CardTravelExpense = ({ data }) => {
  return data?.length
    ? data.map((v, i) => {
        return (
          <div key={i}>
            <div className="flex my-3">
              <div className="w-2/3">
                <div className="text-sm font-semibold">
                  {v?.pn_auditor?.jabatan}
                </div>
                <div className="text-sm">
                  {v?.pn_auditor?.pn} - {v?.pn_auditor?.nama}
                </div>
              </div>
              <div className="w-1/3 text-sm font-semibold">
                Rp.{" "}
                {convertToRupiah(
                  v.biaya_tiket_pp +
                    v.biaya_transport_lokal +
                    v.biaya_perjalanan_hari +
                    v.biaya_akomodasi
                )}
              </div>
            </div>
            <CardCostDetail title={"Tiket PP"} cost={v.biaya_tiket_pp} />
            <CardCostDetail
              title={"Transport Lokal"}
              cost={v.biaya_transport_lokal}
            />
            <CardCostDetail
              title={"Uang Harian"}
              cost={v.biaya_perjalanan_hari}
            />
            <CardCostDetail
              title={"Biaya Akomodasi"}
              cost={v.biaya_akomodasi}
            />
          </div>
        );
      })
    : "";
};

export default CardTravelExpense;
