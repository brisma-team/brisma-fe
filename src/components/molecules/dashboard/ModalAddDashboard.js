import React, { use, useEffect, useState } from "react";
import { Modal, CloseModal, ButtonField, TextInput, Select, ButtonIcon, CheckboxField } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import Button from "@atlaskit/button";
import AddCircleIcon from "@atlaskit/icon/glyph/add-circle";
import Close from "@atlaskit/icon/glyph/editor/close";
import SendIcon from "@atlaskit/icon/glyph/send";
import useUkaList from "@/data/dashboard/useUkaList";
import useRoleList from "@/data/dashboard/useRoleList";
import { confirmationSwal } from "@/helpers";

const ModalFooter = ({ handleConfirm }) => {
  return (
    <div className="w-full flex justify-end -my-1">
      <div className="rounded w-28 bg-atlasian-green">
        <ButtonField text="Simpan" handler={handleConfirm} />
      </div>
    </div>
  );
};

const ModalAddDashboard = ({
  showModal,
  setShowModal,
  data,
  setData,
  handleSubmit,
}) => {
  const [isPublic, setIsPublic] = useState(false);

  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const handleIsPublicChange = (e) => {
    console.log(`VALUE = ${e.target.value}`)
    setIsPublic(isPublic);
    console.log(isPublic);
  }

  return (
    <Modal
      showModal={showModal}
      onClickOutside={CloseModal}
      positionCenter={true}
      footer={<ModalFooter handleConfirm={handleSubmit} />}
    >
      <div className="w-[40rem] relative">
        <CloseModal handleCloseModal={handleCloseModal} showModal={showModal} />
        <div className="mb-4 font-bold text-xl">Tambah Dashboard</div>
        <div className="max-h-[25rem] overflow-y-scroll">
          <div className="grid grid-cols-7">
            <div className="p-3 text-base col-span-2 mb-2">Dashboard ID</div>
            <div className="p-1 col-span-4 mb-2">
              <TextInput
                placeholder="Masukkan Superset ID"
                onChange={(e) => setData({ ...data, embedId: e.target.value })}
              />
            </div>
            <div className="p-3 text-base col-span-2 mb-2">Nama Dashboard</div>
            <div className="p-1 col-span-4 mb-2">
              <TextInput
                placeholder="Masukkan Nama Dashboard"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="p-3 text-base col-span-2 mb-2">Ditujukan Kepada</div>
            <div className="p-1 pt-3 col-span-4 mb-2">
              <CheckboxField
                label="Publik"
                handleChange={handleIsPublicChange}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="grid grid-cols-6 col-span-6 pt-1">
              <div className="p-1 col-span-3">
                <Select
                  // optionValue={ukaMapping}
                  placeholder="Pilih Uka"
                  // onChange={(e) => setUkas(e.value)}
                  isSearchable={true}
                />
              </div>
              <div className="p-1 pl-1 col-span-3">
                <Select
                  // optionValue={roleMapping}
                  placeholder="Pilih Role"
                  // onChange={(e) => setRoles(e.map((obj) => obj.value))}
                  isSearchable={true}
                  isMulti={true}
                />
              </div>
              <div className="text-center p-1 pl-1 col-span-6 pt-3">
                <ButtonField
                  iconAfter={
                    <div className="text-atlasian-purple">
                      <IconPlus size="medium" />
                    </div>
                  }
                  text={`Tambah UKA dan Role`}
                  textColor={"purple"}
                  handler={() => console.log('test')}
                  className={"button"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}



const ModalAddDashboardOld = ({
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
  const [isPublic, setIsPublic] = useState(false);

  const handleEmbedIdChange = (e) => {
    setData({ ...data, embedId: e.target.value });
  };

  const handleNameChange = (e) => {
    setData({ ...data, name: e.target.value });
  };

  const handleIsPublicChange = (e) => {
    setIsPublic(!isPublic);
    if (isPublic === true) {
      setData(curr => {
        const {alllowlist, ...rest} = curr;
        rest.isPublic = true;
        return rest;
      });  
    }
  }

  console.log(isPublic);

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
        <h3 className="p-3 font-bold text-xl mb-3">Tambah Dashboard</h3>
        <div className="grid grid-cols-3">
          <div className="p-1 col-span-3">
            <div className="grid grid-cols-7">
              <div className="p-3 text-base col-span-2 mb02">Dashboard ID</div>
              <div className="p-1 col-span-4 mb-2">
                <TextInput
                  placeholder="Masukkan Superset ID"
                  onChange={handleEmbedIdChange}
                />
              </div>
              <div className="p-3 text-base col-span-2 mb-2">Nama Dashboard</div>

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
                  handleChange={handleIsPublicChange}
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
