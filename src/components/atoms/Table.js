import React from "react";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const TableField = ({ headers, columnWidths, items }) => {
  return (
    <TableTree>
      <Headers>
        {headers.map((header, index) => (
          <Header key={index} width={columnWidths[index]}>
            <p className="font-semibold text-base text-brisma">{header}</p>
          </Header>
        ))}
      </Headers>
      <Rows
        items={items}
        render={(rowData) => (
          <Row>
            {headers.map((header, index) => {
              return (
                <Cell key={index} className="text-brisma">
                  {rowData[header]}
                </Cell>
              );
            })}
          </Row>
        )}
      />
    </TableTree>
  );
};

export default TableField;
