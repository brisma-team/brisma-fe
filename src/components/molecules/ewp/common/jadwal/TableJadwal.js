import { ButtonField, DatepickerField } from "@/components/atoms";
import { convertDate } from "@/helpers";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const TableJadwal = ({
  data,
  payload,
  isDisabled,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="flex flex-col gap-3 w-[40rem] bg-white">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="50%"
            className="border-t border-x cell-jadwal-audit-mapa-ewp"
          >
            Keterangan
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-jadwal-audit-mapa-ewp"
          >
            Tanggal Dimulai
          </Header>
          <Header
            width="25%"
            className="border-t border-r cell-jadwal-audit-mapa-ewp"
          >
            Tanggal Berakhir
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({ keterangan, property_start, property_end }) => (
            <Row>
              <Cell className="!hidden" />
              <Cell width="50%" className="border-x cell-jadwal-audit-mapa-ewp">
                {keterangan}
              </Cell>
              <Cell width="25%" className="border-r cell-jadwal-audit-mapa-ewp">
                <DatepickerField
                  placeholder=" "
                  handleChange={(value) => handleChange(property_start, value)}
                  value={payload[property_start] || ""}
                  maxDate={convertDate(payload[property_end], "-")}
                  isDisabled={isDisabled}
                />
              </Cell>
              <Cell width="25%" className="border-r cell-jadwal-audit-mapa-ewp">
                <DatepickerField
                  placeholder=" "
                  handleChange={(value) => handleChange(property_end, value)}
                  value={payload[property_end] || ""}
                  minDate={convertDate(payload[property_start], "-")}
                  isDisabled={isDisabled}
                />
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      {!isDisabled ? (
        <div className="w-full flex justify-end">
          <div className="w-32 rounded bg-atlasian-green">
            <ButtonField
              text={"Simpan"}
              handler={handleSubmit}
              type={"submit"}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TableJadwal;
