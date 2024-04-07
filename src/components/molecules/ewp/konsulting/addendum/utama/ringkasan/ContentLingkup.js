const ContentLingkup = ({ data }) => {
  return (
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
        <tr>
          <th width="18%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Lingkup</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.judul_lingkup_pemeriksaan}
            </p>
          </th>
        </tr>
      </tbody>
    </table>
  );
};

export default ContentLingkup;
