import { useState } from "react";
import { Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import useOmniSearch from "@/data/catalog/useOmniSearch";

const CardFilterLanding = () => {
  const [selected, setSelected] = useState(0);
  const [omniparam, setOmniparam] = useState("");
  const handleChanged = (event) => {
    setOmniparam(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter")
      if (omniparam == "") {
        alert("Input tidak boleh kosong");
      } else {
        const search = omniparam.split("-");
        const type = selected;
        const datasearch = {
          uker: search[1],
          tahun: search[2],
          projectid: search[3],
          projectname: "",
        };
        useOmniSearch(type, datasearch);
      }
  };
  const handleEmptyState = () => {
    setOmniparam("");
  };
  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-4 mb-3">
      <div className="flex gap-4">
        <div className="w-1/3">
          <Select
            optionValue={[
              { label: "P.A.T", value: 1 },
              { label: "E.W.P", value: 2 },
              { label: "R.P.M", value: 3 },
            ]}
            placeholder="Pilih Jenis"
            onChange={(e) => setSelected(e.value)}
            isSearchable={false}
          />
        </div>
        <div className="w-2/3">
          <TextInput
            placeholder={
              selected == 1 || selected == 0
                ? "Masukkan Nama Project"
                : "Masukkan Kode Project"
            }
            isDisabled={selected != 0 ? false : true}
            value={omniparam}
            onChange={handleChanged}
            onKeyDown={handleKeyDown}
            icon={
              <button className="justify-center" onClick={handleEmptyState}>
                <span>
                  <IconClose size="large" />
                </span>
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CardFilterLanding;
