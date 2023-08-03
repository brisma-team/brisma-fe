import { convertToRupiah } from "@/helpers";

const Content = ({ title, cost }) => {
  return (
    <div className="flex text-sm my-1">
      <div className="w-2/3 pl-5">{title}</div>
      <div className="w-1/3">Rp. {convertToRupiah(cost)}</div>
    </div>
  );
};

const CardBodyContentDetailCost = ({ data }) => {
  return data.length
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
            <Content title={"Tiket PP"} cost={v.biaya_tiket_pp} />
            <Content title={"Transport Lokal"} cost={v.biaya_transport_lokal} />
            <Content title={"Uang Harian"} cost={v.biaya_perjalanan_hari} />
            <Content title={"Biaya Akomodasi"} cost={v.biaya_akomodasi} />
          </div>
        );
      })
    : "";
};

export default CardBodyContentDetailCost;
