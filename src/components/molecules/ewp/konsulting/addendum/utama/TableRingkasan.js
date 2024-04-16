import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { ButtonField, ButtonIcon } from "@/components/atoms";
import { ButtonEdit } from "@/components/molecules/commons";
import { IconFile } from "@/components/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setObjDataRingkasan,
  setObjDataRingkasanDetail,
  setObjPayloadRingkasan,
  resetObjDataRingkasan,
  resetObjDataRingkasanDetail,
  resetObjPayloadRingkasan,
  resetValidationErrorsRingkasan,
} from "@/slices/ewp/konsulting/addendum/utama/ringkasanUtamaAddendumEWPKonsultingSlice";
import {
  useDetailRingkasan,
  useRingkasan,
} from "@/data/ewp/konsulting/addendum/lain";
import { confirmationSwal, fetchApi, loadingSwal } from "@/helpers";
import _ from "lodash";
import ModalDetailRingkasan from "./ModalDetailRingkasan";
import ModalEditRingkasan from "./ModalEditRingkasan";

const TableRingkasan = ({ id }) => {
  const dispatch = useDispatch();
  const section = {
    tim: "Tim",
    lingkup: "Lingkup Pemeriksaan",
    risk: "Risk",
    control: "Control",
  };

  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const data = useSelector(
    (state) => state.ringkasanUtamaAddendumEWPKonsulting.objDataRingkasan
  );
  const dataDetail = useSelector(
    (state) => state.ringkasanUtamaAddendumEWPKonsulting.objDataRingkasanDetail
  );
  const payload = useSelector(
    (state) => state.ringkasanUtamaAddendumEWPKonsulting.objPayloadRingkasan
  );
  // const validation = useSelector(
  //   (state) =>
  //     state.ringkasanUtamaAddendumEWPKonsulting.validationErrorsRingkasan
  // );

  const { ringkasan, ringkasanMutate } = useRingkasan({
    id,
    type: "core",
  });
  const { detailRingkasan } = useDetailRingkasan({
    addendum_id: selectedId,
  });

  useEffect(() => {
    if (ringkasan?.data?.length) {
      const mappingRingkasan = ringkasan?.data?.map((v) => {
        return _.pick(v, [
          "id",
          "addendum_id",
          "part",
          "keterangan",
          "alasan",
          "note_sebelum",
          "note_sesudah",
          "module",
        ]);
      });
      dispatch(setObjDataRingkasan(mappingRingkasan));
    } else {
      dispatch(resetObjDataRingkasan());
    }
  }, [ringkasan]);

  useEffect(() => {
    if (detailRingkasan?.data) {
      dispatch(
        setObjDataRingkasanDetail(
          _.pick(detailRingkasan?.data, [
            "part",
            "sebelum",
            "sesudah",
            "method",
          ])
        )
      );
    } else {
      dispatch(resetObjDataRingkasanDetail());
    }
  }, [detailRingkasan, showModalDetail]);

  // [ START ] handler for modal ringkasan
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalDetail(false);
    setShowModalEdit(false);
    setSelectedId(0);
    dispatch(resetObjPayloadRingkasan());
    dispatch(resetValidationErrorsRingkasan());
  };

  const handleChangeText = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayloadRingkasan(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loadingSwal();
    await fetchApi(
      "POST",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary`,
      {
        id: id,
        type: "core",
      }
    );

    ringkasanMutate();
    setShowModalEdit(false);
    setSelectedId(0);
    dispatch(resetObjPayloadRingkasan());
    loadingSwal("close");
  };

  const handleReset = async (e) => {
    e.preventDefault();
    loadingSwal();
    await fetchApi(
      "PATCH",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/summary/reset/${id}?module=core`,
      {}
    );
    ringkasanMutate();
    loadingSwal("close");
  };
  // [ END ] handler for modal ringkasan

  // [ START ] handler for table ringkasan
  const handleClickUpdateTable = async (addendum_id) => {
    setShowModalEdit(true);
    setSelectedId(addendum_id);
  };

  const handleClickViewTable = async (addendum_id) => {
    setShowModalDetail(true);
    setSelectedId(addendum_id);
  };
  // [ END ] handler for table ringkasan

  return (
    <div className="flex flex-col gap-4">
      <div className="dataTables-custom bg-white">
        <TableTree>
          <Headers>
            <Header className="!hidden" />
            <Header
              width="10%"
              className="border-t border-x cell-custom-dataTables rounded-ss-lg flex justify-center"
            >
              Aksi
            </Header>
            <Header
              width="18%"
              className="border-t border-x cell-custom-dataTables"
            >
              Section
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Keterangan
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Sebelum
            </Header>
            <Header
              width="18%"
              className="border-t border-r cell-custom-dataTables"
            >
              Sesudah
            </Header>
            <Header
              width="18%"
              className="border-t border-r rounded-se-lg cell-custom-dataTables"
            >
              Alasan
            </Header>
          </Headers>
          {data?.length ? (
            <Rows
              items={data}
              render={({
                id,
                part,
                keterangan,
                note_sebelum,
                note_sesudah,
                alasan,
              }) => (
                <Row>
                  <Cell className="!hidden" />
                  <Cell
                    width="10%"
                    className="border-x cell-custom-dataTables flex justify-center"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <ButtonIcon
                        icon={<ButtonEdit />}
                        handleClick={() => handleClickUpdateTable(id)}
                        color={"yellow"}
                      />
                      <ButtonIcon
                        icon={
                          <div className="rounded-full border border-atlasian-dark w-5 h-5 flex items-center justify-center p-1 text-atlasian-dark">
                            <IconFile size="small" />
                          </div>
                        }
                        handleClick={() => handleClickViewTable(id)}
                      />
                    </div>
                    {/* ) : (
                    ""
                  )} */}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {section[part] || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {keterangan || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {note_sebelum || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {note_sesudah || "-"}
                  </Cell>
                  <Cell width="18%" className="border-r cell-custom-dataTables">
                    {alasan || "-"}
                  </Cell>
                </Row>
              )}
            />
          ) : (
            <Row>
              <Cell
                width="100%"
                className="border-x cell-custom-dataTables flex justify-center"
              >
                <div className="w-full pt-4 pb-2 text-center">
                  <p>
                    <b>No data available in table</b>
                  </p>
                </div>
              </Cell>
            </Row>
          )}
        </TableTree>
      </div>
      <ModalDetailRingkasan
        data={dataDetail}
        showModal={showModalDetail}
        handleCloseModal={handleCloseModal}
      />
      <ModalEditRingkasan
        data={payload}
        showModal={showModalEdit}
        handleCloseModal={handleCloseModal}
        handleChangeText={handleChangeText}
        handleSubmit={handleSubmit}
      />
      <div className="w-full flex justify-end gap-3 -my-1">
        <div className="w-[7.75rem] bg-atlasian-red rounded">
          <ButtonField text={"Reset"} handler={handleReset} />
        </div>
        <div className="rounded w-28 bg-atlasian-green">
          <ButtonField text={"Simpan"} handler={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TableRingkasan;
