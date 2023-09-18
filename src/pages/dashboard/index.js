import Main from "@/layouts/MainLayout";
import SupersetDashboard from "@/components/molecules/dashboard/SupersetDashboard";
import { useState, useEffect } from "react";
import useGetToken from "@/data/dashboard/useGetToken";
import { Select, ButtonField } from "@/components/atoms";
import VidShareScreenIcon from "@atlaskit/icon/glyph/vid-share-screen";

const breadcrumb = [
  {
    label: "Dashboard",
    current: true,
  },
];

export default function index() {
  const { data } = useGetToken();
  const [dashboardList, setDashboardList] = useState([]);
  const [selected, setSelected] = useState("");
  const [ctoken, setCtoken] = useState("");
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    if (data && data) {
      const mapping = data.list.map((v) => {
        return {
          label: v.name,
          value: v.embed_id,
        };
      });
      setDashboardList(mapping);
      if (selected == "") {
        setTagName(mapping[0].label);
        setSelected(mapping[0].value);
      }

      setCtoken(data.token);
    }
  }, [data]);

  const openKioskModeTab = () => {
    // URL untuk mode kiosk
    const kioskURL = `/dashboard/kiosk/${selected}`; // Ganti dengan URL yang sesuai

    // Membuka tab baru dengan URL mode kiosk
    window.open(kioskURL, "_blank");
  };

  return (
    <Main breadcrumb={breadcrumb}>
      <div className="px-5">
        <div className="flex items-center mb-6">
          <div className="text-3xl font-bold pl-5">{tagName}</div>
        </div>
        <div className="flex w-[24rem] pl-5 mb-5">
          <div className="w-[14rem]">
            <Select
              optionValue={dashboardList}
              placeholder="Pilih Jenis Dashboard"
              onChange={(e) => setSelected(e.value)}
              isSearchable={true}
            />
          </div>
          <div className="w-[9rem] ml-2 pt-1 bg-atlasian-blue-dark rounded-md hover:bg-atlasian-blue-baby">
            <ButtonField
              handler={openKioskModeTab}
              text={"Kiosk Mode"}
              iconAfter={<VidShareScreenIcon primaryColor="#fff" />}
            />
          </div>
        </div>
        {selected && data.token && (
          <SupersetDashboard token={ctoken} id={selected} />
        )}
      </div>
    </Main>
  );
}
