import React, { use, useEffect, useState } from "react";
import { Modal, CloseModal, ButtonField, TextInput, CheckboxField } from "@/components/atoms";
import { IconPlus } from "@/components/icons";
import UkaSelectDashboard from "@/components/molecules/dashboard/UkaSelectDashboard";
import RoleSelectDashboard from "@/components/molecules/dashboard/RoleSelectDashboard";

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
  const [dataPayload, setDataPayload] = useState({embedId: "", name: ""});
  const [ukaRolePayload, setUkaRolePayload] = useState([{ uka_code: "", role_code: ""}]); 

  const handleCloseModal = async () => {
    setShowModal(false);
  };
  
  const handleIsPublicChange = (e) => {
    if (e.target.checked === true) {
      setIsPublic(true)
      setUkaRolePayload([{ uka_code: "", role_code: ""}])
    } else {
      setIsPublic(false)
    }
  }

  const handleChangeEmbedId = (e) => {
    setDataPayload({ ...dataPayload, embedId: e.target.value });
  };
    
  const handleChangeName = (e) => { 
    setDataPayload({ ...dataPayload, name: e.target.value });
  };

  const handleChangeUka = (e, index) => {
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload[index] = {
      ...newUkaRolePayload[index],
      uka_code: e.value
    }
    setUkaRolePayload(newUkaRolePayload);
  }

  const handleChangeRole = (e, index) => {
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload[index] = {
      ...newUkaRolePayload[index],
      role_code: e.map((obj) => obj.value)
    }
    setUkaRolePayload(newUkaRolePayload)
  }

  const handleAddUkaRoleGroup = () => {
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload.push({
      uka_code: "",
      role_code: ""
    })
    setUkaRolePayload(newUkaRolePayload)
  }

  useEffect(() => {
    if (isPublic) {
      setData(curr => {
        const { allowlist, ...rest } = curr;
        return {
          ...rest,
          ...dataPayload,
          isPublic: true,
        }
      });
    } else if(isPublic == false) {
      setData(curr => {
        const { isPublic, ...rest } = curr;
        return {
          ...rest,
          ...dataPayload,
          allowlist: ukaRolePayload,
        }
      });
    }
  }, [dataPayload, ukaRolePayload, isPublic, data]);

  console.log(ukaRolePayload)

  return (
    <Modal
      showModal={showModal}
      onClickOutside={handleCloseModal}
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
                onChange={(e) => handleChangeEmbedId(e)}
              />
            </div>
            <div className="p-3 text-base col-span-2 mb-2">Nama Dashboard</div>
            <div className="p-1 col-span-4 mb-2">
              <TextInput
                placeholder="Masukkan Nama Dashboard"
                onChange={(e) => handleChangeName(e)}
              />
            </div>
            <div className="p-3 text-base col-span-2 mb-2">Ditujukan Kepada</div>
            <div className="p-1 pt-3 col-span-4 mb-2">
              <CheckboxField
                label="Publik"
                handleChange={handleIsPublicChange}
              />
            </div>
            { isPublic == false ? 
                ukaRolePayload.map((item, index) => {
                  const { uka_code, role_code } = item;
                  return (
                    <div className="grid grid-cols-7 col-span-7 pt-1">
                      <div className="p-3 text-base col-span-2"></div>
                      <div className="p-1 col-span-4" key={index}>
                        <div className="mb-2 flex justify-between gap-3 overflow-x-hidden">
                            <div className="w-1/2">
                              <UkaSelectDashboard
                                isSearchable={true}
                                handleChange={(e) =>  handleChangeUka(e, index)}
                                placeholder={"Pilih UKA"}
                                width={"w-[10rem]"}
                              />
                            </div>
                            <div className="w-1/2">
                              <RoleSelectDashboard
                                  isSearchable={true}
                                  isMulti={true}
                                  handleChange={(e) => handleChangeRole(e, index)}
                                  placeholder={"Pilih Role"}
                                  width={"w-[11rem]"}
                              />
                            </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : null
            }

            {
              isPublic == false ?
                <div className="grid grid-cols-7 col-span-7 pt-1">
                  <div className="p-3 text-base col-span-2 mb-2"></div>
                  <div className="p-1 col-span-4 mb-2">
                    <div className="mb-2 flex justify-between gap-3 overflow-x-hidden">
                      <div className="w-full">
                        <ButtonField
                          iconAfter={
                            <div className="text-atlasian-purple">
                              <IconPlus size="medium" />
                            </div>
                          }
                          text={`Tambah UKA dan Role`}
                          textColor={"purple"}
                          handler={() => handleAddUkaRoleGroup()  }
                          className={"button"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              : null
            }
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalAddDashboard;