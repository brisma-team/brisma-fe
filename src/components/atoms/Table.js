import React from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { DataNotFound } from "../molecules/commons";

const TableField = ({
  headers,
  columnWidths,
  items,
  customStyle,
  customField,
}) => {
  return (
    <TableTree>
      <Headers>
        {headers.map((header, index) => (
          <Header key={index} width={columnWidths[index] || 100}>
            <p className="font-semibold text-base text-brisma">{header}</p>
          </Header>
        ))}
      </Headers>
      {!items.length ? (
        <DataNotFound />
      ) : (
        <Rows
          items={items}
          render={(rowData) => (
            <Row>
              {headers.map((header, index) => {
                let cellContent = rowData[header];
                let cellClassName = "";

                if (header === customField && customStyle) {
                  cellClassName += ` ${customStyle[cellContent] || ""}`;
                }
                return (
                  <Cell key={index}>
                    <p
                      className={`${
                        cellClassName.length > 0 ? cellClassName : `text-brisma`
                      }`}
                    >
                      {rowData[header]}
                    </p>
                  </Cell>
                );
              })}
            </Row>
          )}
        />
      )}
    </TableTree>
  );
};

export default TableField;
