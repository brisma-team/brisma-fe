import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import { useAuditInfo } from "@/data/ewp/common/info";
import { LandingLayoutEWPQualityAssurance } from "@/layouts/ewp";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/quality-assurance/dokumen/documentEWPQualityAssuranceSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  confirmationSwal,
  convertDate,
  dateNow,
  downloadFromUrl,
  fetchApi,
  infoSwal,
  loadingSwal,
  setErrorValidation,
  usePostFileData,
} from "@/helpers";
import {
  ModalUploadDocument,
  ModalBulkDownload,
  DataTables,
  ModalDescription,
} from "@/components/molecules/ewp/common/dokumen";
import {
  useBulkDownloadDocument,
  useListDocument,
} from "@/data/ewp/common/dokumen";
import uploadDocumentEWPSchema from "@/helpers/schemas/ewp/common/uploadDocumentEWPSchema";
import { IconArrowDown } from "@/components/icons";
import _ from "lodash";
import useUser from "@/data/useUser";

const index = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    id: 0,
  });
  const dispatch = useDispatch();
  const baseUrl = `/ewp/quality-assurance/${params?.id}`;

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalBulkDownload, setShowModalBulkDownload] = useState(false);
  const [showModalDesc, setShowModalDesc] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataBulkDownload, setDataBulkDownload] = useState([]);
  const [filterBulkDownload, setFilterBulkDownload] = useState({});
  const [isFinalProject, setIsFinalProject] = useState(false);
  const [isInitiator, setIsInitiator] = useState(false);

  const data = useSelector(
    (state) => state.documentEWPQualityAssurance.objData
  );
  const payload = useSelector(
    (state) => state.documentEWPQualityAssurance.objPayload
  );
  const validation = useSelector(
    (state) => state.documentEWPQualityAssurance.validationErrors
  );

  const { auditInfo } = useAuditInfo({
    module: "qa",
    id: params?.id,
  });
  const { listDocument, listDocumentMutate } = useListDocument({
    id: params?.id,
  });
  const { bulkDownloadDocument } = useBulkDownloadDocument({
    ref_document_id: filterBulkDownload?.kode || "",
    id: params?.id,
  });
  const { user } = useUser();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setParams({
      id,
    });
  }, [router.isReady]);

  useEffect(() => {
    setBreadcrumbs([
      { name: "Menu", path: "/dashboard" },
      { name: "EWP", path: "/ewp" },
      { name: "Overview", path: "/ewp/quality-assurance" },
      {
        name: `${auditInfo?.data?.project_info?.project_id?.toUpperCase()} / Berkas Dokumen`,
        path: baseUrl + "/info",
      },
      {
        name: `Berkas Dokumen`,
        path: baseUrl + "/dokumen",
      },
    ]);
    setIsFinalProject(
      Boolean(auditInfo?.data?.project_info?.status_kode === "9")
    );
    setIsInitiator(
      Boolean(auditInfo?.data?.project_info?.initiator?.pn === user?.data?.pn)
    );
  }, [auditInfo, user]);

  useEffect(() => {
    if (bulkDownloadDocument?.findAllDoc?.length) {
      const mapping = bulkDownloadDocument?.findAllDoc?.map((v) => {
        const { file_url, file_name, doc_name } = v;
        return {
          upload_date: v?.created_at,
          file_url,
          file_name,
          doc_name,
        };
      });
      setDataBulkDownload(mapping);
    } else {
      setDataBulkDownload([]);
    }
  }, [bulkDownloadDocument, showModalBulkDownload]);

  useEffect(() => {
    if (listDocument?.findAllDoc?.length) {
      const mapping = listDocument?.findAllDoc?.map((v, index) => {
        const {
          file_url,
          file_name,
          deskripsi,
          ref_document_id,
          ref_document_name,
          doc_name,
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
          doc_name,
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

  const handleClickBulkDownload = async () => {
    if (dataBulkDownload?.length) {
      loadingSwal();
      const mappingUrl = dataBulkDownload.map((v) => {
        return v?.file_url;
      });
      const response = await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_COMMON}/common/cdn/bulk_download`,
        {
          url_list: mappingUrl,
          file_name: `BulkDownloadDocument-${convertDate(dateNow(), "")}`,
          modul: "ewp",
        },
        true
      );

      if (response?.url?.length) {
        const url = response?.url[0];
        const regex = /\/([^\/]+\.zip)$/;
        const matches = url.match(regex);
        let fileName = "";
        if (matches && matches.length) {
          fileName = matches[1];
        }
        downloadFromUrl(url, fileName);
      }
      loadingSwal("close");
    } else {
      await infoSwal("Tidak ada dokumen yang dapat didownload!");
    }
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
    setDataBulkDownload([]);
  };

  const handleChangeFilterBulkDownload = (e) => {
    setFilterBulkDownload({ kode: e.value.kode, name: e.value.name });
  };

  const handleResetFilterBulkDonwload = () => {
    setFilterBulkDownload({});
  };

  const handleOpenModalBulkDownload = () => {
    setShowModalBulkDownload(true);
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
      schema: uploadDocumentEWPSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMapping);

    if (validate) {
      loadingSwal();
      const objPayload = {
        ewp_id: params?.id,
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
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/wrapup/create`,
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
      `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/qa/wrapup/delete/${id}`,
      { id }
    );
    listDocumentMutate();
    loadingSwal("close");
  };
  // [ END ] handler for table

  return (
    <LandingLayoutEWPQualityAssurance>
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
              withoutAction={!(isInitiator && !isFinalProject)}
              handleClickDelete={handleClickDeleteTable}
              handleClickInfo={handleClickInfoTable}
            />
            <div className="w-full flex justify-end gap-3">
              {isInitiator && !isFinalProject ? (
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
              ) : (
                ""
              )}
              <div className="w-40 rounded border-2">
                <ButtonField
                  icon={
                    <div className="text-brisma">
                      <IconArrowDown />
                    </div>
                  }
                  text={`Bulk Download`}
                  textColor={"brisma"}
                  handler={handleOpenModalBulkDownload}
                  disabled={Boolean(data?.length > 0 ? false : true)}
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
    </LandingLayoutEWPQualityAssurance>
  );
};

export default index;
