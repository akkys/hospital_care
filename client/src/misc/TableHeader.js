import React from "react";
import { Table } from "react-bootstrap";

const TableHeader = ({ contents, data, align, avatar }) => {
  return (
    <>
      <Table responsive>
        <thead className="table-info">
          <tr style={{ textAlign: `${align}` }}>
            {contents.map((content, i) => (
              <th key={i} scope="col">
                <label>{content}</label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-light">{data}</tbody>
      </Table>
    </>
  );
};

export default TableHeader;
