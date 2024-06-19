import { TableAnggaran } from "@/components/molecules/ewp/common/anggaran";
import { useEffect, useState } from "react";
import _ from "lodash";

const SubContentAnggaran = ({ data }) => {
  const [dataAnggaran, setDataAnggaran] = useState([]);
  useEffect(() => {
    if (data?.length) {
      const mappingAnggaran = data?.map((v) => {
        return _.pick(v, [
          "id",
          "tipe_anggaran_name",
          "amount",
          "deskripsi",
          "tanggal",
          "tanggal_end",
        ]);
      });
      setDataAnggaran(mappingAnggaran);
    } else {
      setDataAnggaran([]);
    }
  }, [data]);

  return <TableAnggaran data={dataAnggaran} withoutButtonAction />;
};

export default SubContentAnggaran;
