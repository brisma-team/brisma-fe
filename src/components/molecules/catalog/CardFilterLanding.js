import { useState, useCallback, useEffect } from "react";
import { Select, TextInput, Modal } from "@/components/atoms";
import { useOmniSearch } from "@/data/catalog";

const CardFilterLanding = () => {
  const [selected, setSelected] = useState(0);
  const [omniList, setOmniList] = useState([]);
  const [params, setParams] = useState({
    type: "ewp",
    year: 2023,
    words: "",
  });
  const { omni } = useOmniSearch("ewp", params.year, params.words);
  const handleChange = useCallback(
    (e) => {
      setParams({
        ...params,
        words: e.target.value,
      });
    },
    [params]
  );

  useEffect(() => {
    if (omni !== undefined || "") {
      setIsModalOpen(true);
      setOmniList(omni.data.ewp_list);
    }
  }, [omni]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-2 mb-3">
      <div className="flex gap-4">
        <div className="w-1/3">
          <Select
            optionValue={[
              { label: "P.A.T", value: "pat" },
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
            placeholder="Masukkan kata kunci..."
            value={params.words}
            onChange={handleChange}
          />
          <Modal showModal={isModalOpen} onClickOutside={closeModal}>
            {/* Render your omni results here */}
            {omniList?.map((result) => (
              <div key={result.id}>{result.name}</div>
            ))}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CardFilterLanding;
