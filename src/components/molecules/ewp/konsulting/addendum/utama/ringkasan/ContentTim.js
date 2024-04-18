import React from "react";

const ContentTim = ({ data }) => {
  const tableCellStyle = { border: "1px solid #ccc" };
  const tableHeaderStyle = {
    backgroundColor: "#3C64B1",
    color: "white",
    border: "1px solid #fff",
  };
  const tableFontSize = { fontSize: "12px" };

  const renderTableRows = (items) => {
    return items.map((item, index) => (
      <tr key={index}>
        <td style={{ ...tableCellStyle, textAlign: "center" }}>
          <p style={{ ...tableFontSize }}>{index + 1}</p>
        </td>
        <td style={{ ...tableCellStyle }}>
          <p style={{ ...tableFontSize }}>{item?.pn}</p>
        </td>
        <td style={{ ...tableCellStyle }}>
          <p style={{ ...tableFontSize }}>{item?.nama || "-"}</p>
        </td>
        {item?.mandays && (
          <td style={{ ...tableCellStyle }}>
            <p style={{ ...tableFontSize }}>{item?.mandays}</p>
          </td>
        )}
        {item?.deskripsi && (
          <td style={{ ...tableCellStyle }}>
            <p style={{ ...tableFontSize }}>{item?.deskripsi}</p>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <>
      <p style={{ fontWeight: 600 }}>1. P.I.C Auditor</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
              <p style={{ ...tableFontSize }}>No</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>PN</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>Nama</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.auditor?.length > 0 && renderTableRows(data.auditor)}
        </tbody>
      </table>
      <p style={{ fontWeight: 600 }}>2. P.I.C Auditee</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
              <p style={{ ...tableFontSize }}>No</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>PN</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>Nama</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.auditee?.length > 0 && renderTableRows(data.auditee)}
        </tbody>
      </table>

      <p style={{ fontWeight: 600 }}>3. Anggota Tim Audit</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, textAlign: "center" }}>
              <p style={{ ...tableFontSize }}>No</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>PN</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>Nama</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>Mandays</p>
            </th>
            <th style={{ ...tableHeaderStyle }}>
              <p style={{ ...tableFontSize }}>Deskripsi</p>
            </th>
          </tr>
        </thead>
        <tbody>{data?.ata?.length > 0 && renderTableRows(data.ata)}</tbody>
      </table>
    </>
  );
};

export default ContentTim;
