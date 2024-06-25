const RowContent = ({ label, value, isHtml }) => {
  return (
    <tr>
      <th width="18%">
        <p style={{ fontSize: "14px", fontWeight: 500 }}>{label}</p>
      </th>
      <th width="1%">
        <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
      </th>
      <th width="81%">
        {isHtml ? (
          <div
            className="mt-4"
            dangerouslySetInnerHTML={{
              __html: value,
            }}
          />
        ) : (
          <p style={{ fontSize: "14px", fontWeight: 500 }}>{value}</p>
        )}
      </th>
    </tr>
  );
};

const SubContentProject = ({ data }) => {
  return (
    <div className="px-4 py-3">
      <table
        style={{
          width: "100%",
          borderStyle: "none !important",
          border: "0px solid #fff",
          borderCollapse: "separate",
        }}
        cellSpacing="0"
        cellPadding="0"
      >
        <tbody>
          <RowContent
            label={"Project ID"}
            value={data?.project_id?.toUpperCase()}
          />
          <RowContent label={"Project Name"} value={data?.project_name} />
          <RowContent label={"Tahun"} value={data?.tahun} />
          <RowContent label={"Tipe"} value={data?.mtd_tipe?.nama || ""} />
          <RowContent label={"Jenis"} value={data?.mtd_jenis?.nama || ""} />
          <RowContent label={"Analisa"} value={data?.analisa || ""} isHtml />
        </tbody>
      </table>
    </div>
  );
};

export default SubContentProject;
