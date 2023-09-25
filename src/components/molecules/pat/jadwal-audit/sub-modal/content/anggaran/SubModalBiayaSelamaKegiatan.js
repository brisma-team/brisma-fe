import { ReactSelect, TextInput } from "@/components/atoms";
import { IconClose } from "@/components/icons";
import { FormWithLabel, CardBodyContent } from "@/components/molecules/commons";
import { useKategoriAnggaran } from "@/data/pat";
import { setAuditScheduleData } from "@/slices/pat/auditScheduleSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CardActivityExpense } from "@/components/molecules/pat";

const SubModalBiayaSelamaKegiatan = ({ typeModal }) => {
  console.log(typeModal);
  const { control } = useForm();
  const dispatch = useDispatch();
  const auditScheduleData = useSelector(
    (state) => state.auditSchedule.auditScheduleData
  );

  const { kategoriAnggaran } = useKategoriAnggaran();

  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedSubActivityCategory, setSelectedSubActivityCategory] =
    useState(null);
  const [optionActivityCategory, setOptionActivityCategory] = useState([]);
  const [optionSubActivityCategory, setOptionSubActivityCategory] = useState(
    []
  );
  useEffect(() => {
    const mapping = kategoriAnggaran?.data?.map((v) => {
      return {
        label: v?.nama,
        value: {
          nama: v.nama,
          ref_sub_kategori_anggarans: v.ref_sub_kategori_anggarans,
        },
      };
    });
    setOptionActivityCategory(mapping);
  }, [kategoriAnggaran]);

  const handleClickResetValue = (idx) => {
    setOptionSubActivityCategory((prevData) => {
      const updatedOptionSubActivityCategory = [
        ...prevData.ref_sub_kategori_anggarans,
      ];
      updatedOptionSubActivityCategory[idx].amount = 0;
      return updatedOptionSubActivityCategory;
    });
  };

  const handleChangeActivityCategory = (e) => {
    setSelectedSubActivityCategory(e.value.nama);
    const mapping = e.value.ref_sub_kategori_anggarans?.map((v) => {
      return {
        ref_sub_kategori_anggaran_kode: {
          ref_sub_kategori_anggaran_kode: v.id,
          ref_sub_kategori_anggaran_name: v.nama,
        },
        amount: 0,
      };
    });

    setOptionSubActivityCategory({
      nama: e.value.nama,
      ref_sub_kategori_anggarans: mapping,
    });
    setIsDisabled(false);
  };

  const handleChangeSubActivityCategory = (e, idx) => {
    setOptionSubActivityCategory((prevData) => {
      const updatedOptionSubActivityCategory =
        prevData.ref_sub_kategori_anggarans.map((item, index) => {
          if (index === idx) {
            if (isNaN(parseInt(e.target.value))) {
              return {
                ...item,
                amount: 0,
              };
            } else if (parseInt(e.target.value) > 2000000000) {
              return {
                ...item,
                amount: 2000000000,
              };
            } else {
              return {
                ...item,
                amount: parseInt(e.target.value),
              };
            }
          } else {
            return item;
          }
        });

      return {
        ...prevData,
        ref_sub_kategori_anggarans: updatedOptionSubActivityCategory,
      };
    });
  };

  const handleAddBudget = () => {
    const newData = [...auditScheduleData.anggaran_kegiatan];
    const findByName = newData.findIndex(
      (v) => v?.nama == selectedSubActivityCategory
    );

    if (findByName !== -1) {
      newData[findByName] = optionSubActivityCategory;
    } else {
      newData.push(optionSubActivityCategory);
    }

    dispatch(
      setAuditScheduleData({
        ...auditScheduleData,
        anggaran_kegiatan: newData,
      })
    );
    setOptionSubActivityCategory([]);
    setIsDisabled(true);
  };

  return (
    <div className="w-full gap-3 flex p-6">
      <div className="w-1/2">
        <CardBodyContent handler={handleAddBudget} buttonDisabled={isDisabled}>
          <FormWithLabel
            label={"Kategori Kegiatan"}
            form={
              <ReactSelect
                control={control}
                isSearchable={false}
                options={optionActivityCategory}
                handleChange={(e) => handleChangeActivityCategory(e)}
              />
            }
            widthLabel={"w-2/5"}
            widthForm={"w-3/5"}
          />
          {optionSubActivityCategory?.ref_sub_kategori_anggarans?.length
            ? optionSubActivityCategory?.ref_sub_kategori_anggarans?.map(
                (v, i) => {
                  return (
                    <div key={i}>
                      <FormWithLabel
                        label={
                          v?.ref_sub_kategori_anggaran_kode
                            .ref_sub_kategori_anggaran_name
                        }
                        form={
                          <TextInput
                            icon={<IconClose />}
                            handleClick={() => handleClickResetValue(i)}
                            onChange={(e) =>
                              handleChangeSubActivityCategory(e, i)
                            }
                            value={v.amount}
                          />
                        }
                        widthLabel={"w-2/5"}
                        widthForm={"w-3/5"}
                      />
                    </div>
                  );
                }
              )
            : ""}
        </CardBodyContent>
      </div>
      <div className="w-1/2">
        <CardBodyContent>
          {auditScheduleData.anggaran_kegiatan.length ? (
            <div className="font-bold text-base">
              Rincian Biaya Perjalanan Dinas
            </div>
          ) : (
            ""
          )}
          <CardActivityExpense data={auditScheduleData.anggaran_kegiatan} />
        </CardBodyContent>
      </div>
    </div>
  );
};

export default SubModalBiayaSelamaKegiatan;
