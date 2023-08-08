import { Select, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { useState } from "react";

const CardFilterLanding = () => {
  const [selected, setSelected] = useState("");
  const [omniparam, setOmniparam] = useState("");
  const handleChanged = (event) => {
    setOmniparam(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter")
      if (omniparam == "") alert("Input tidak boleh kosong");
      else console.log(omniparam);
  };
  const handleEmptyState = () => {
    setOmniparam("");
  };
  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/3">
          <Select
            optionValue={[
              { label: "P.A.T", value: "P.A.T" },
              { label: "E.W.P", value: "E.W.P" },
              { label: "R.P.M", value: "R.P.M" },
            ]}
            placeholder="Pilih Jenis"
            onChange={(e) => setSelected(e.value)}
            isSearchable={false}
          />
        </div>
        <div className="w-2/3">
          <TextInput
            placeholder={
              selected == "P.A.T" || selected == ""
                ? "Masukkan Nama Project"
                : "Masukkan Kode Project"
            }
            isDisabled={selected != "" ? false : true}
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
    </>
  );
};

export default CardFilterLanding;
