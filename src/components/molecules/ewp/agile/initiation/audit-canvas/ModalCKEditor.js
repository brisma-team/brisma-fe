import { ModalScroll } from "@/components/atoms";
import {
  ContentView,
  ModalFooter,
  ModalHeader,
} from "@/components/molecules/commons";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/atoms/Editor"), {
  ssr: false,
});

const ModalCKEditor = ({
  showModal,
  data,
  title,
  isDisabled,
  handleCloseModal,
  handleChange,
  handleSubmit,
}) => {
  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalHeader
          showModal={showModal}
          headerText={"Business Modal Canvas"}
          title={title || ""}
          titleClassName={
            "mt-1 text-base text-atlasian-blue-light font-semibold"
          }
          handleCloseModal={handleCloseModal}
        />
      }
      footer={
        <ModalFooter
          buttonText={"Simpan"}
          handleSubmit={async () => handleSubmit(title)}
        />
      }
    >
      {!isDisabled ? (
        <div className="ckeditor-latar-belakang-mapa-ewp">
          <Editor contentData={data} ready={true} onChange={handleChange} />
        </div>
      ) : (
        <ContentView dataDoc={data} />
      )}
    </ModalScroll>
  );
};

export default ModalCKEditor;
