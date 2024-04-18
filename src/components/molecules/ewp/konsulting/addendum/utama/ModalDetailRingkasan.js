import { ModalScroll } from "@/components/atoms";
import {
  ModalHeader,
  CardContentHeaderFooter,
} from "@/components/molecules/commons";
import {
  ContentControl,
  ContentRisk,
  ContentLingkup,
  ContentTim,
} from "./ringkasan";

const TimTimeplan = ({ data }) => {
  return (
    <div className="w-[100rem] flex gap-4">
      <CardContentHeaderFooter
        header={<h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>}
      >
        <div className="p-4">
          <ContentTim data={data?.sebelum?.tim_audit} />
        </div>
      </CardContentHeaderFooter>
      <CardContentHeaderFooter
        header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
        headerHeight={"h-fit"}
      >
        <div className="p-4">
          <ContentTim data={data?.sesudah?.tim_audit} />
        </div>
      </CardContentHeaderFooter>
    </div>
  );
};

const Lingkup = ({ data }) => {
  switch (data?.method?.type) {
    case "update":
      return (
        <div className="w-[100rem] flex gap-4">
          <CardContentHeaderFooter
            header={
              <h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>
            }
          >
            <div className="p-4">
              <ContentLingkup data={data?.sebelum} />
            </div>
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
            headerHeight={"h-fit"}
          >
            <div className="p-4">
              <ContentLingkup data={data?.sesudah} />
            </div>
          </CardContentHeaderFooter>
        </div>
      );
    case "add":
      return (
        <div className="w-[31rem]">
          <ContentLingkup data={data?.method?.data} />
        </div>
      );
    case "remove":
      return (
        <div className="w-[31rem]">
          <ContentLingkup data={data?.method?.data} />
        </div>
      );
  }
};

const Risk = ({ data }) => {
  return (
    <div className="w-[31rem]">
      <ContentRisk data={data} />
    </div>
  );
};

const Control = ({ data }) => {
  switch (data?.method?.type) {
    case "update":
      return (
        <div className="w-[100rem] flex gap-4">
          <CardContentHeaderFooter
            header={
              <h4 className="p-4 text-atlasian-green">Sebelum Addendum</h4>
            }
          >
            <div className="p-4">
              <ContentControl data={data?.sebelum} />
            </div>
          </CardContentHeaderFooter>
          <CardContentHeaderFooter
            header={<h4 className="p-4 text-atlasian-red">Sesudah Addendum</h4>}
            headerHeight={"h-fit"}
          >
            <div className="p-4">
              <ContentControl data={data?.sesudah} />
            </div>
          </CardContentHeaderFooter>
        </div>
      );
    case "add":
      return (
        <div className="w-[31rem]">
          <ContentControl data={data?.method?.data} />
        </div>
      );
    case "remove":
      return (
        <div className="w-[31rem]">
          <ContentControl data={data?.method?.data} />
        </div>
      );
  }
};

const ModalDetailRingkasan = ({ data, showModal, handleCloseModal }) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          headerText={"Detail Ringkasan"}
        />
      }
    >
      {data?.part === "control" ? (
        <Control data={data} />
      ) : data?.part === "risk" ? (
        <Risk data={data?.method?.data} />
      ) : data?.part === "lingkup" ? (
        <Lingkup data={data} />
      ) : data?.part === "tim" ? (
        <TimTimeplan data={data} />
      ) : (
        ""
      )}
    </ModalScroll>
  );
};

export default ModalDetailRingkasan;
