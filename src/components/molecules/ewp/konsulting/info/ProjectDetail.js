import RowTable from "./RowTable";

const ProjectDetail = ({ data }) => {
  return (
    <div className="w-full">
      <p className="text-base font-bold mb-2 ml-2">Project Details</p>
      <div className="w-full border-l-2 border-r-2 border-t-2 border-atlasian-gray-light">
        <RowTable
          label="Project ID"
          value={data?.project_id?.toUpperCase() || ""}
        />
        <RowTable label="Nama Project" value={data?.project_name || ""} />
        <RowTable
          label="Periode Ruang Lingkup"
          start={data?.info_periode_pelaksanaan_start || ""}
          end={data?.info_periode_pelaksanaan_end || ""}
        />
        <RowTable
          label="Inisiator"
          value={
            data?.initiator?.pn +
              " - " +
              (data?.initiator?.nama || data?.initiator?.name) || "-"
          }
        />
      </div>
    </div>
  );
};

export default ProjectDetail;
