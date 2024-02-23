import React, { useEffect, useState } from "react";
import {
  ModalScroll,
  CloseModal,
  ButtonField,
  TextInput,
  CheckboxField,
  ButtonIcon,
} from "@/components/atoms";
import { IconCrossCircle, IconPlus } from "@/components/icons";
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

const ModalEditDashboard = ({
  showEditModal,
  setShowEditModal,
  editData,
  setEditData,
  handleUpdate,
}) => {
  const [isPublic, setIsPublic] = useState(editData.is_public);
  const [dataPayload, setDataPayload] = useState({
    embedId: editData.superset_embed_id,
    name: editData.dashboard_name,
  });
  const [ukaRolePayload, setUkaRolePayload] = useState([
    { uka_code: "", role_code: "" },
  ]);
  const [clearUkaRole, setClearUkaRole] = useState(false);

  useEffect(() => {
    if (
      editData.allow_list !== null &&
      isPublic == false &&
      clearUkaRole == false
    ) {
      setUkaRolePayload(
        editData.allow_list.map((item) => {
          return {
            uka_code: item.mapped_uka_code,
            uka_name: item.mapped_uka,
            role_code: item.mapped_role_code,
            role_name: item.mapped_role,
          };
        })
      );
      setClearUkaRole(true);
    }
  }, [editData.allow_list, isPublic, clearUkaRole]);

  const handleCloseModal = async () => {
    setShowEditModal(false);
  };

  const handleIsPublicChange = (e) => {
    if (e.target.checked === true) {
      setIsPublic(true);
      setUkaRolePayload([{ uka_code: "", role_code: "" }]);
    } else {
      setIsPublic(false);
    }
  };

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
      uka_code: e.value,
      uka_name: e.label.split(" - ")[1],
    };
    setUkaRolePayload(newUkaRolePayload);
  };

  console.log(ukaRolePayload);

  const handleChangeRole = (e, index) => {
    console.log("role:" + e.map((obj) => obj.label));
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload[index] = {
      ...newUkaRolePayload[index],
      role_code: e.map((obj) => obj.value),
      role_name: e.map((obj) => obj.label.split(" - ")[1]),
    };
    setUkaRolePayload(newUkaRolePayload);
  };

  const handleAddUkaRoleGroup = () => {
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload.push({
      uka_code: "",
      role_code: "",
    });
    setUkaRolePayload(newUkaRolePayload);
  };

  const handleDeleteUkaRole = (index) => {
    console.log("Before deletion:", ukaRolePayload);
    const newUkaRolePayload = [...ukaRolePayload];
    newUkaRolePayload.splice(index, 1);
    console.log("After deletion:", newUkaRolePayload);
    setUkaRolePayload(newUkaRolePayload);
  };

  useEffect(() => {
    if (isPublic) {
      setEditData((curr) => {
        const { allowlist, ...rest } = curr;
        return {
          ...rest,
          ...dataPayload,
          id: curr.id,
          isPublic: true,
        };
      });
    } else if (isPublic == false) {
      setEditData((curr) => {
        const { isPublic, ...rest } = curr;
        return {
          ...rest,
          ...dataPayload,
          id: curr.id,
          isPublic: false,
          allowlist: ukaRolePayload.map((item) => {
            return { uka_code: item.uka_code, role_code: item.role_code };
          }),
        };
      });
    }
  }, [dataPayload, ukaRolePayload, isPublic]);

  return (
    <ModalScroll
      showModal={showEditModal}
      onClickOutside={handleCloseModal}
      positionCenter={true}
      footer={<ModalFooter handleConfirm={handleUpdate} />}
    >
      <div className="w-[40rem] relative">
        <CloseModal
          handleCloseModal={handleCloseModal}
          showModal={showEditModal}
        />
        <div className="mb-4 font-bold text-xl">Ubah Dashboard</div>
        <div className="grid grid-cols-7">
          <div className="p-3 text-base col-span-2 mb-2">Dashboard ID</div>
          <div className="p-1 col-span-4 mb-2">
            <TextInput
              placeholder="Masukkan Superset ID"
              value={dataPayload.embedId}
              onChange={(e) => handleChangeEmbedId(e)}
            />
          </div>
          <div className="p-3 text-base col-span-2 mb-2">Nama Dashboard</div>
          <div className="p-1 col-span-4 mb-2">
            <TextInput
              placeholder="Masukkan Nama Dashboard"
              value={dataPayload.name}
              onChange={(e) => handleChangeName(e)}
            />
          </div>
          <div className="p-3 text-base col-span-2 mb-2">Ditujukan Kepada</div>
          <div className="p-1 pt-3 col-span-4 mb-2">
            <CheckboxField
              label="Publik"
              isChecked={isPublic}
              handleChange={handleIsPublicChange}
            />
          </div>
          {isPublic == false
            ? ukaRolePayload.map((item, index) => {
                const { uka_code, role_code, uka_name, role_name } = item;
                return (
                  <div className="grid grid-cols-7 col-span-7 pt-1" key={index}>
                    <div className="p-3 text-base col-span-2"></div>
                    <div className="p-1 col-span-4" key={index}>
                      <div className="mb-2 flex justify-between gap-3 overflow-x-hidden">
                        <div className="w-1/2">
                          {uka_code !== "" ? (
                            <UkaSelectDashboard
                              isSearchable={true}
                              selectedValue={{
                                label: uka_code + " - " + uka_name,
                                value: uka_code,
                              }}
                              handleChange={(e) => handleChangeUka(e, index)}
                              placeholder={"Pilih UKA"}
                              width={"w-[10rem]"}
                            />
                          ) : (
                            <UkaSelectDashboard
                              isSearchable={true}
                              handleChange={(e) => handleChangeUka(e, index)}
                              placeholder={"Pilih UKA"}
                              width={"w-[10rem]"}
                            />
                          )}
                        </div>
                        <div className="w-1/2">
                          {role_code !== "" ? (
                            <RoleSelectDashboard
                              isSearchable={true}
                              isMulti={true}
                              selectedValue={role_code.map((v, index) => {
                                return {
                                  label: v + " - " + role_name[index],
                                  value: v,
                                };
                              })}
                              handleChange={(e) => handleChangeRole(e, index)}
                              placeholder={"Pilih Role"}
                              width={"w-[11rem]"}
                            />
                          ) : (
                            <RoleSelectDashboard
                              isSearchable={true}
                              isMulti={true}
                              handleChange={(e) => handleChangeRole(e, index)}
                              placeholder={"Pilih Role"}
                              width={"w-[11rem]"}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 p-2 pt-3" key={index}>
                      <ButtonIcon
                        icon={<IconCrossCircle />}
                        color={"red"}
                        handleClick={() => handleDeleteUkaRole(index)}
                      />
                    </div>
                  </div>
                );
              })
            : null}

          {isPublic == false ? (
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
                      handler={() => handleAddUkaRoleGroup()}
                      className={"button"}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalEditDashboard;
