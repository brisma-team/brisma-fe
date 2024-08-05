import { TextAreaField } from "@/components/atoms";

const TabNewSampleFile = ({ data, handleChangeDescription }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p>{data?.filename || ""}</p>
      <TextAreaField
        placeholder={"Description"}
        value={data?.description || ""}
        handleChange={(e) => handleChangeDescription(e.target.value)}
      />
    </div>
  );
};

export default TabNewSampleFile;
