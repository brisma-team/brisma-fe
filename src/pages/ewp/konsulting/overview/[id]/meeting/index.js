import React, { useEffect, useState } from "react";
import { LandingLayoutEWPConsulting } from "@/layouts/ewp";
import {
  Breadcrumbs,
  ButtonField,
  CustomPagination,
  PageTitle,
} from "@/components/atoms";
import { DataNotFound, SelectSortFilter } from "@/components/molecules/commons";
import {
  confirmationSwal,
  copyToClipboard,
  fetchApi,
  loadingSwal,
  setErrorValidation,
} from "@/helpers";
import _ from "lodash";
import {
  CardOverview,
  ModalAddMeeting,
  CardFilterOverview,
} from "@/components/molecules/ewp/konsulting/meeting/overview";
import { useDispatch, useSelector } from "react-redux";
import { useOverview } from "@/data/ewp/konsulting/meeting";
import {
  setObjData,
  setObjPayload,
  setValidationErrors,
  resetObjData,
  resetObjPayload,
  resetValidationErrors,
} from "@/slices/ewp/konsulting/meeting/overviewMeetingEWPKonsultingSlice";
import { useRouter } from "next/router";
import createMeetingEWPKonsultingSchema from "@/helpers/schemas/ewp/konsulting/meeting/createMeetingEWPKonsultingSchema";

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "EWP", path: "/ewp" },
  { name: "Meeting Overview", path: "/ewp/konsulting/meeting" },
];

const index = () => {
  const dispatch = useDispatch();
  const { id } = useRouter().query;

  const [showFilter, setShowFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [totalData, setTotalData] = useState(1);

  const data = useSelector(
    (state) => state.overviewMeetingEWPKonsulting.objData
  );
  const payload = useSelector(
    (state) => state.overviewMeetingEWPKonsulting.objPayload
  );
  const validation = useSelector(
    (state) => state.overviewMeetingEWPKonsulting.validationErrors
  );

  const [filter, setFilter] = useState({
    judul: "",
    metode: "",
    maker: "",
    periode_start: "",
    periode_end: "",
    pic: "",
    pembicara: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });
  const [params, setParams] = useState({
    judul: "",
    metode: "",
    maker: "",
    periode_start: "",
    periode_end: "",
    pic: "",
    pembicara: "",
    sort_by: "ASC",
    limit: 4,
    page: 1,
  });

  const { overview, overviewMutate } = useOverview({ id, ...params });

  useEffect(() => {
    const handleSearch = () => {
      setParams(filter);
    };
    const debouncedSearch = _.debounce(handleSearch, 800);
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [filter]);

  useEffect(() => {
    if (overview?.data?.length) {
      const mapping = overview?.data?.map((v) => {
        const mappingPIC = v?.pic_meeting?.length
          ? v?.pic_meeting?.map((pic) => {
              const { pn, nama, jabatan } = pic;
              return {
                pn,
                nama,
                jabatan,
              };
            })
          : [];

        const mappingPembicara = v?.pembicara_meeting?.length
          ? v?.pembicara_meeting?.map((pembicara) => {
              const { pn, nama, jabatan } = pembicara;
              return {
                pn,
                nama,
                jabatan,
              };
            })
          : [];

        return {
          pic_meeting: mappingPIC,
          pembicara_meeting: mappingPembicara,
          ..._.pick(v, [
            "id",
            "judul_meeting",
            "desc",
            "create_by",
            "createdAt",
            "link_meeting",
            "periode_start",
            "periode_end",
            "metode_meeting",
          ]),
        };
      });

      dispatch(setObjData(mapping));
    } else {
      dispatch(resetObjData());
    }
  }, [overview]);

  useEffect(() => {
    console.log("data => ", data);
  }, [data]);

  // [ START ] handler for card filter
  const handleChangeFilter = (props, value) => {
    setFilter({ ...filter, [props]: value });
  };

  const handleResetFilter = (props) => {
    setFilter({ ...filter, [props]: "" });
  };
  // [ END ] handler for card filter

  const handleClickUrl = (e, url) => {
    e.stopPropagation();
    copyToClipboard(url, "Link meeting berhasil disalin ke clipboard.");
  };

  // [ START ] handler for modal add meeting
  const handleCloseModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );
    if (!confirm.value) {
      return;
    }

    setShowModal(false);
  };

  const handleChangeTextPayload = (property, value) => {
    dispatch(setObjPayload({ ...payload, [property]: value }));
  };

  const handleChangeSelectPayload = (property, index, value) => {
    const newData = [...payload[property]];
    newData[index] = value;

    const updatedPayload = { ...payload, [property]: newData };

    dispatch(setObjPayload(updatedPayload));
  };

  useEffect(() => {
    console.log("payload => ", payload);
  }, [payload]);

  const handleResetPayload = (property) => {
    dispatch(setObjPayload({ ...payload, [property]: "" }));
  };

  const handleAddPIC = () => {
    const newData = [...payload.pic_meeting];
    newData.push({
      pn: "",
      nama: "",
    });
    dispatch(setObjPayload({ ...payload, pic_meeting: newData }));
  };

  const handleAddPembicara = () => {
    const newData = [...payload.pembicara_meeting];
    newData.push({
      pn: "",
      nama: "",
    });
    dispatch(setObjPayload({ ...payload, pembicara_meeting: newData }));
  };

  const handleDeletePIC = (idx) => {
    const newData = [...payload.pic_meeting];
    newData.splice(idx, 1);
    const updatedData = {
      ...payload,
      pic_meeting: newData,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleDeletePembicara = (idx) => {
    const newData = [...payload.pembicara_meeting];
    newData.splice(idx, 1);
    const updatedData = {
      ...payload,
      pembicara_meeting: newData,
    };
    dispatch(setObjPayload(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schemaMappings = {
      schema: createMeetingEWPKonsultingSchema,
      resetErrors: resetValidationErrors,
      setErrors: setValidationErrors,
    };
    const validate = setErrorValidation(payload, dispatch, schemaMappings);

    if (validate) {
      loadingSwal();
      await fetchApi(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/create`,
        { ewp_id: id, ...payload }
      );

      overviewMutate();
      resetObjPayload();
      setShowModal(false);
      loadingSwal("close");
    }
  };
  // [ END ] handler for modal add meeting

  return (
    <LandingLayoutEWPConsulting>
      {/* Start Breadcrumbs */}
      <Breadcrumbs data={breadcrumbs} />
      {/* End Breadcrumbs */}
      <div className="flexitems-center mb-6">
        <PageTitle text={"Project Overview"} />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex justify-between items-center gap-2">
          <div className="w-36 bg-atlasian-blue-light rounded">
            <ButtonField
              handler={() => setShowFilter(!showFilter)}
              text={showFilter ? `Tutup Filter` : `Tampilkan Filter`}
            />
          </div>
          <div className="w-36 rounded bg-atlasian-purple">
            <ButtonField
              handler={() => setShowModal(true)}
              text={"Buat Meeting"}
            />
          </div>
        </div>
      </div>
      <div className="">
        <CardFilterOverview
          data={filter}
          showFilter={showFilter}
          handleChange={handleChangeFilter}
          handleReset={handleResetFilter}
        />
      </div>
      <div className="w-full mt-6 flex items-end justify-end">
        <SelectSortFilter
          change={handleChangeFilter}
          options={[4, 8, 16, 50, 100]}
        />
      </div>
      {/* End Filter */}
      {/* Start Content */}
      {data?.length ? (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-3 my-4">
          {data.map((v, i) => {
            return (
              <CardOverview key={i} data={v} handleClickUrl={handleClickUrl} />
            );
          })}
        </div>
      ) : (
        <DataNotFound />
      )}
      <CustomPagination
        perPage={filter.limit}
        defaultCurrentPage={1}
        handleSetPagination={(start, end, pageNow) =>
          handleChangeFilter("page", pageNow)
        }
        totalData={totalData}
      />
      {/* End Content */}
      <ModalAddMeeting
        showModal={showModal}
        data={payload}
        validation={validation}
        handleCloseModal={handleCloseModal}
        handleChangeText={handleChangeTextPayload}
        handleChangeSelect={handleChangeSelectPayload}
        handleReset={handleResetPayload}
        handleSubmit={handleSubmit}
        handleClickAddPIC={handleAddPIC}
        handleClickAddPembicara={handleAddPembicara}
        handleClickDeletePIC={handleDeletePIC}
        handleClickDeletePembicara={handleDeletePembicara}
      />
    </LandingLayoutEWPConsulting>
  );
};

export default index;
