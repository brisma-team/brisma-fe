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

const SubContentUker = ({ data }) => {
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
            label={"Branch Kode"}
            value={data?.ref_auditee_branch_kode}
          />
          <RowContent
            label={"Branch Name"}
            value={data?.ref_auditee_branch_name}
          />
          <RowContent
            label={"Orgeh Kode"}
            value={data?.ref_auditee_orgeh_kode || ""}
          />
          <RowContent
            label={"Orgeh Name"}
            value={data?.ref_auditee_orgeh_name || ""}
          />
          <RowContent
            label={"Tipe Uker"}
            value={data?.tipe_uker?.toUpperCase() || ""}
          />
          <RowContent label={"Deskripsi"} value={data?.desc || ""} />
          <RowContent
            label={"Attachment"}
            value={data?.attachments?.length ? data?.attachments[0] : ""}
          />
        </tbody>
      </table>
    </div>
  );
};

export default SubContentUker;
