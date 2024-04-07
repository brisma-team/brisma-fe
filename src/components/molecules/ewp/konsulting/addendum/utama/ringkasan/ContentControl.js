const ContentControl = ({ data }) => {
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
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Auditor</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.pn_pic} - {data?.nama_pic}
            </p>
          </th>
        </tr>
        <tr>
          <th width="18%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Lingkup</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {
                data?.mapa_uker_mcr_adendum?.lingkup_adendum
                  ?.judul_lingkup_pemeriksaan
              }
            </p>
          </th>
        </tr>
        <tr>
          <th width="18%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Risk</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.mapa_uker_mcr_adendum?.mtd_risk_issue?.abbr} -{" "}
              {data?.mapa_uker_mcr_adendum?.mtd_risk_issue?.nama}
            </p>
          </th>
        </tr>
        <tr>
          <th width="18%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Control</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.mtd_control?.abbr} - {data?.mtd_control?.nama}
            </p>
          </th>
        </tr>
        <tr>
          <th width="18%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>Uraian</p>
          </th>
          <th width="1%">
            <p style={{ fontSize: "14px", fontWeight: 500 }}>:</p>
          </th>
          <th width="81%">{data?.uraian || ""}</th>
        </tr>
      </tbody>
    </table>
  );
};

export default ContentControl;
