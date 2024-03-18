import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useProjectDetail } from "@/data/ewp/konsulting";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/dokumen/documentEWPKonsultingSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  fetchApi,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import {
  ModalUploadDocument,
  ModalBulkDownload,
  DataTables,
  ModalDescription,
} from "@/components/molecules/ewp/konsulting/dokumen";
import {
  useBulkDownloadDocument,
  useListDocument,
} from "@/data/ewp/konsulting/dokumen";
import uploadDocumentEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/dokumen/uploadDocumentEWPKonsultingSchema";
import { IconArrowDown } from "@/components/icons";
import _ from "lodash";

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const baseUrl = `/ewp/konsulting/overview/${id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalBulkDownload, setShowModalBulkDownload] = useState(false);
  const [showModalDesc, setShowModalDesc] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataBulkDownload, setDataBulkDownload] = useState([]);
  const [filterBulkDownload, setFilterBulkDownload] = useState({});

  const data = useSelector((state) => state.documentEWPKonsulting.objData);
  const payload = useSelector(
    (state) => state.documentEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.documentEWPKonsulting.validationErrors
  );

  const { projectDetail } = useProjectDetail({ id });
  const { listDocument, listDocumentMutate } = useListDocument({ id });
  const { bulkDownloadDocument } = useBulkDownloadDocument({
    ref_document_id: filterBulkDownload?.kode || "",
    id,
  });

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/konsulting/overview" },
      {
        name: `${projectDetail?.data?.project_info?.project_id?.toUpperCase()} / Berkas Dokumen`,
        path: baseUrl,
      },
    ]);
  }, [projectDetail]);

  useEffect(() => {
    if (bulkDownloadDocument?.findAllDoc?.length) {
      const mapping = listDocument?.findAllDoc?.map((v) => {
        const { file_url, file_name } = v;
        return {
          upload_date: v?.created_at,
          file_url,
          file_name,
        };
      });
      setDataBulkDownload(mapping);
    } else {
      setDataBulkDownload([]);
    }
  }, [bulkDownloadDocument]);

  useEffect(() => {
    if (listDocument?.findAllDoc?.length) {
      const mapping = listDocument?.findAllDoc?.map((v, index) => {
        const {
          file_url,
          file_name,
          deskripsi,
          ref_document_id,
          ref_document_name,
        } = v;
        return {
          index,
          doc_id: v?.id,
          upload_date: v?.created_at,
          file_url,
          file_name,
          uploader: v?.uploader?.nama,
          deskripsi,
          ref_document_id,
          ref_document_name,
        };
      });

      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [listDocument]);

  const handleClickUpload = () => {
    setShowModal(true);
  };

  const handleClickBulkDownload = () => {
    setShowModalBulkDownload(true);
  };

  // [ START ] handler for modal bulk download
  const handleCloseModalBulkDownload = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModalBulkDownload(false);
    setFilterBulkDownload({});
  };

  const handleChangeFilterBulkDownload = (e) => {
    setFilterBulkDownload({ kode: e.value.kode, name: e.value.name });
  };

  const handleResetFilterBulkDonwload = () => {
    setFilterBulkDownload({});
  };
  // [ END ] handler for modal bulk download

  // [ START ] handler for modal
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    dispatch(resetObjPayload());
    dispatch(resetValidationErrors());
  };

  const handleChangeTextPayload = (property, value) => {
    const updatedData = {
      ...payload,
      [property]: value,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleChangeSelectPayload = (property, value) => {
    const updatedData = { ...payload };
    if (property === "document_type") {
      updatedData.ref_document_id = value?.kode;
      updatedData.ref_document_name = value?.name;
    }
    dispatch(setObjPayload(updatedData));
  };

  const handleResetPayload = (property) => {
    const updatedData = {
      ...payload,
      [property]: "",
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleUploadDocument = async (e) => {
    loadingSwal();
    if (e.target.files) {
      const url = `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/upload`;
      const response = await usePostFileData(url, {
        file: e.target.files[0],
        modul: "ewp",
      });

      dispatch(
        setObjPayload({
          ...payload,
          file_url: response.url[0],
          file_name: e.target.files[0].name,
        })
      );
    }
    loadingSwal("close");
  };

  const handleSubmitUploadDocument = async (e) => {
    e.preventDefault();
    const schemaMapping = {
      schema: uploadDocumentEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      const objPayload = {
        ewp_id: id,
        doc_name: payload.document_name,
        deskripsi: payload.desc,
        by_system: false,
        ..._.pick(payload, [
          "file_url",
          "file_name",
          "ref_document_id",
          "ref_document_name",
        ]),
      };
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/wrapup/create`,
        objPayload
      );

      listDocumentMutate();
      setShowModal(false);
      dispatch(resetObjPayload());
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal

  // [ START ] handler for modal description
  const handleCloseModalDescription = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }
    setShowModalDesc(false);
  };
  // [ END ] handler for modal description

  // [ START ] handler for table
  const handleClickInfoTable = (index) => {
    setSelectedIndex(index);
    setShowModalDesc(true);
  };

  const handleClickDeleteTable = async (id) => {
    const confirm = await confirmationSwal(
      "Apakah anda yakin ingin menghapus dokumen ini?"
    );

    if (!confirm.value) {
      return;
    }

    loadingSwal();
    await fetchApi(
      "DELETE",
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/wrapup/delete/${id}`,
      { id }
    );
    listDocumentMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Berkas Dokumen" />
      </div>
      {/* Start Content */}
      <div className="w-[68rem]">
        <Card>
          <div className="flex flex-col gap-4 px-6 pt-2 pb-4 w-full">
            <DataTables
              data={data}
              handleClickDelete={handleClickDeleteTable}
              handleClickInfo={handleClickInfoTable}
            />
            <div className="w-full flex justify-end gap-3">
              <div className="w-40 rounded border-2">
                <ButtonField
                  icon={
                    <div className="text-brisma rotate-180">
                      <IconArrowDown />
                    </div>
                  }
                  text={`Upload`}
                  textColor={"brisma"}
                  handler={handleClickUpload}
                />
              </div>
              <div className="w-40 rounded border-2">
                <ButtonField
                  icon={
                    <div className="text-brisma">
                      <IconArrowDown />
                    </div>
                  }
                  text={`Bulk Download`}
                  textColor={"brisma"}
                  handler={handleClickBulkDownload}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <ModalUploadDocument
        showModal={showModal}
        data={payload}
        validation={validation}
        handleChangeText={handleChangeTextPayload}
        handleChangeSelect={handleChangeSelectPayload}
        handleCloseModal={handleCloseModal}
        handleReset={handleResetPayload}
        handleUpload={handleUploadDocument}
        handleSubmit={handleSubmitUploadDocument}
      />
      <ModalBulkDownload
        showModal={showModalBulkDownload}
        data={dataBulkDownload}
        payload={filterBulkDownload}
        handleBulkDownload={handleClickBulkDownload}
        handleChange={handleChangeFilterBulkDownload}
        handleCloseModal={handleCloseModalBulkDownload}
        handleReset={handleResetFilterBulkDonwload}
      />
      <ModalDescription
        data={data[selectedIndex]?.deskripsi}
        showModal={showModalDesc}
        handleCloseModal={handleCloseModalDescription}
      />
      {/* End Content */}
    </LandingLayoutEWPConsulting>
  );
};

export default index;
