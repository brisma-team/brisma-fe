import React, { useEffect, useState } from "react";
import { Modal, TextInput, Select } from "@/components/atoms";
import Button from "@atlaskit/button";
import Close from "@atlaskit/icon/glyph/editor/close";
import SendIcon from "@atlaskit/icon/glyph/send";
import useUkaList from "@/data/dashboard/useUkaList";
import useRoleList from "@/data/dashboard/useRoleList";

const ModalAddDashboard = ({
  showModal,
  setShowModal,
  data,
  setData,
  handleSubmit,
}) => {
  const { uka } = useUkaList();
  const { role } = useRoleList();
  // const [selected, setSelected] = useState();
  const [ukaMapping, setUkaMapping] = useState();
  const [roleMapping, setRoleMapping] = useState();
  const [roles, setRoles] = useState();
  const [ukas, setUkas] = useState();

  const handleEmbedIdChange = (e) => {
    setData({ ...data, embedId: e.target.value });
  };

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (uka != undefined) {
      const mapping = uka.uka.map((v) => {
        return {
          label: v.kode + " - " + v.name,
          value: v.kode,
        };
      });
      setUkaMapping(mapping);
    }
  }, [uka]);

  useEffect(() => {
    if (role != undefined) {
      const mapping = role.userRole.map((v) => {
        return {
          label: v.kode + " - " + v.name,
          value: v.kode,
        };
      });
      setRoleMapping(mapping);
    }
  }, [role]);

  useEffect(() => {
    setData({
      ...data,
      allowlist: [
        {
          uka_code: ukas,
          role_code: roles,
        },
      ],
    });
  }, [ukas, roles]);

  return (
    <Modal
      showModal={showModal}
      onClickOutside={closeModal}
      positionCenter={true}
    >
      <div className="w-[40rem] h-modal p-4">
        <h3 className="p-3 font-bold text-xl mb-3">Form Dashboard</h3>
        <div className="grid grid-cols-3">
          <div className="p-1 col-span-3">
            <div className="grid grid-cols-7">
              <div className="p-3 text-base col-span-2">Dashboard ID</div>
              <div className="p-1 col-span-5">
                <TextInput
                  placeholder="Masukkan Superset ID"
                  onChange={handleEmbedIdChange}
                />
              </div>
              <div className="p-3 text-base col-span-2">Nama Dashboard</div>

              <div className="p-1 col-span-5">
                <TextInput
                  placeholder="Masukkan Nama Dashboard"
                  onChange={handleNameChange}
                />
              </div>

              <div className="p-3 text-base col-span-2 row-span-3">
                Ditujukan Kepada
              </div>
              <div className="p-1 col-span-2">
                <Select
                  optionValue={ukaMapping}
                  placeholder="Pilih Uka"
                  onChange={(e) => setUkas(e.value)}
                  isSearchable={true}
                />
              </div>
              <div className="p-1 pl-1 col-span-3">
                <Select
                  optionValue={roleMapping}
                  placeholder="Pilih Role"
                  onChange={(e) => setRoles(e.map((obj) => obj.value))}
                  isSearchable={true}
                  isMulti={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-7">
              <div className="col-span-2"></div>
              <div className="p-1 col-span-2">
                <Button
                  appearance="default"
                  shouldFitContainer
                  onClick={closeModal}
                  iconBefore={<Close size="medium" />}
                >
                  Tutup
                </Button>
              </div>
              <div className="p-1 col-span-2">
                <Button
                  appearance="primary"
                  shouldFitContainer
                  onClick={handleSubmit}
                  iconBefore={<SendIcon size="medium" />}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAddDashboard;
