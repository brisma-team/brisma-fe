import React, { useEffect, useState } from "react";
import { Modal, TextInput, Select, ButtonIcon, CheckboxField } from "@/components/atoms";
import Button from "@atlaskit/button";
import Close from "@atlaskit/icon/glyph/editor/close";
import SendIcon from "@atlaskit/icon/glyph/send";
import useUkaList from "@/data/dashboard/useUkaList";
import useRoleList from "@/data/dashboard/useRoleList";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";

const ModalEditDashboard = ({
  showEditModal,
  setShowEditModal,
  handleUpdate,
  editData,
}) => {
  const { uka } = useUkaList();
  const { role } = useRoleList();
  // const [selected, setSelected] = useState();
  const [ukaMapping, setUkaMapping] = useState([]);
  const [roleMapping, setRoleMapping] = useState([]);
  const [roles, setRoles] = useState([]);
  const [ukas, setUkas] = useState([]);
  const [data, setData] = useState();
  const [isPublic, setIsPublic] = useState(false);

  const handleEmbedIdChange = (e) => {
    setData({ ...data, embedId: e.target.value });
  };

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const closeModal = () => {
    setShowEditModal(false);
  };

  console.log(editData);
  useEffect(() => {
    if (uka != undefined) {
      const mapping = uka.uka.map((v) => ({
        label: `${v.kode} - ${v.name}`,
        value: v.kode,
      }));
      setUkaMapping(mapping);
    }
  }, [uka]);

  useEffect(() => {
    if (role != undefined) {
      const mapping = role.userRole.map((v) => ({
        label: `${v.kode} - ${v.name}`,
        value: v.kode,
      }));
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
      showModal={showEditModal}
      onClickOutside={closeModal}
      positionCenter={true}
    >
      <div className="w-[40rem] h-modal p-4">
        <h3 className="p-3 font-bold text-xl mb-3">Ubah Dashboard</h3>
        <div className="grid grid-cols-3">
          <div className="p-1 col-span-3">
            <div className="grid grid-cols-7">
              <div className="p-3 text-base col-span-2">Dashboard ID</div>
              <div className="p-1 col-span-4 mb-2">
                <TextInput
                  placeholder="Masukkan Superset ID"
                  onChange={handleEmbedIdChange}
                />
              </div>
              <div className="p-3 text-base col-span-2 mb-2">
                Nama Dashboard
              </div>

              <div className="p-1 col-span-4 mb-2">
                <TextInput
                  placeholder="Masukkan Nama Dashboard"
                  onChange={handleNameChange}
                />
              </div>

              <div className="p-3 text-base col-span-2 row-span-3 mb-2">
                Ditujukan Kepada
              </div>
              <div className="p-1 pt-3 col-span-5">
                <CheckboxField
                  label="Publik"
                  handleChange={() => setIsPublic(!isPublic)}
                />
              </div>

              { !isPublic ? 
                <div className="grid grid-cols-5 col-span-5 pt-1">
                  <div className="p-1 col-span-2">
                    <Select
                      optionValue={ukaMapping}
                      placeholder="Pilih Uka"
                      onChange={(e) => setUkas(e.value)}
                      isSearchable={true}
                    />
                  </div>
                  <div className="p-1 pl-1 col-span-2">
                    <Select
                      optionValue={roleMapping}
                      placeholder="Pilih Role"
                      onChange={(e) => setRoles(e.map((obj) => obj.value))}
                      isSearchable={true}
                      isMulti={true}
                    />
                  </div>
                  <div className="p-1 pl-1 col-span-1 pt-3">
                    <ButtonIcon
                      handleClick={() => console.log("...")}
                      icon={
                        <AddCircleIcon
                          primaryColor="red"
                          secondaryColor="white"
                          size="medium"
                        />
                      }
                    />
                  </div>
                </div>
                : null 
              }
              
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
                  onClick={handleUpdate}
                  iconBefore={<SendIcon size="medium" />}
                >
                  Perbarui
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditDashboard;
