import { useState } from "react";
import { ButtonIcon, Select as Selects } from "@/components/atoms";
import { OmniSelect } from "../commons";
import { IconEditorSearch } from "@/components/icons";
import { useRouter } from "next/router";

const CardFilterLanding = () => {
  const [params, setParams] = useState({
    type: "pat",
    label: "P.A.T",
    year: 2023,
    words: "",
  });
  const router = useRouter();

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-2 mb-3">
      <div className="flex gap-4">
        <div className="w-1/4">
          <Selects
            optionValue={[
              { label: "P.A.T", value: "pat" },
              { label: "E.W.P", value: "ewp" },
              { label: "R.P.M", value: "rpm" },
            ]}
            onChange={(e) =>
              setParams({ ...params, label: e.label, type: e.value })
            }
            isSearchable={false}
            value={{ label: params.label, value: params.value }}
          />
        </div>
        <div className="w-3/4">
          <OmniSelect
            placeholder={"Masukkan Kata Kunci"}
            customIcon={<ButtonIcon icon={<IconEditorSearch />} />}
            type={params.type}
            year={params.year}
            handleChange={(e) =>
              router.push(
                params.type == "ewp"
                  ? "catalogue/" +
                      params.type +
                      "/" +
                      e.value.source.toString() +
                      "x1c-" +
                      e.value.id.toString() +
                      "x1c-2023"
                  : "catalogue/" + params.type + "/" + e.value.id.toString()
              )
            }
            selectedValue={params.words}
          />
        </div>
      </div>
    </div>
  );
};

export default CardFilterLanding;
