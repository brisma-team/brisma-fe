import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import {
  IconChevronDown,
  IconChevronRight,
  IconPlus,
} from "@/components/icons";
import {
  ButtonField,
  ButtonIcon,
  CustomCheckbox,
  LinkIcon,
  LozengeField,
} from "@/components/atoms";
import { ButtonDelete } from "@/components/molecules/commons";
import Image from "next/image";
import { ImageGroup } from "@/helpers/imagesUrl";
const positionCenter = `w-full h-full flex justify-center items-center`;

const TablePemeriksaan = ({
  data,
  expansionMap,
  handleSelectedLingkupPemeriksaan,
  handleSelectedRisk,
  handleClickToggleExpansion,
  handleClickAddLingkupPemeriksaan,
  handleClickAddRisk,
  handleClickAddControl,
  handleClickDeleteLingkupPemeriksaan,
  handleClickDeleteRisk,
  handleClickDeleteControl,
  handleClickReview,
}) => {
  return (
    <div className="dataTables-custom">
      <TableTree>
        <Headers>
          <Header className="!hidden" />
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables justify-center"
          >
            Review
          </Header>
          <Header
            width="8%"
            className="border-t border-x cell-custom-dataTables justify-center"
          >
            Aksi
          </Header>
          <Header
            width="49%"
            className="border-t border-x cell-custom-dataTables"
          >
            LINGKUP PEMERIKSAAN
          </Header>
          <Header
            width="20%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            P.I.C
          </Header>
          <Header
            width="15%"
            className="border-t border-r cell-custom-dataTables justify-center"
          >
            Uraian
          </Header>
        </Headers>
        <Rows
          items={data}
          render={({
            id,
            role,
            is_review,
            lingkup_pemeriksaan,
            risk,
            control,
            pic,
            uraian,
            children = [],
          }) => (
            <Row
              itemId={id}
              role={role}
              items={children}
              hasChildren={children.length > 0}
              isExpanded={Boolean(expansionMap[`${id}-${role}`])}
            >
              <Cell className="!hidden" />
              <Cell
                width="8%"
                className="border-x cell-custom-dataTables justify-center"
              >
                <CustomCheckbox
                  handleChange={(e) => handleClickReview(e, id, role)}
                  value={is_review}
                />
              </Cell>
              <Cell
                width="8%"
                className="border-r cell-custom-dataTables justify-center"
              >
                <ButtonIcon
                  icon={<ButtonDelete />}
                  handleClick={async () => {
                    if ((await role) === "parent") {
                      handleClickDeleteLingkupPemeriksaan(id);
                    } else if (role === "parent-child") {
                      handleClickDeleteRisk(id);
                    } else {
                      handleClickDeleteControl(id);
                    }
                  }}
                />
              </Cell>
              <Cell
                width="49%"
                className="border-r cell-custom-dataTables cell-width-full-height-full px-10"
              >
                <div className={`${positionCenter}`}>
                  {role !== "child" ? (
                    <ButtonIcon
                      handleClick={() => handleClickToggleExpansion(id, role)}
                      icon={
                        expansionMap[`${id}-${role}`] ? (
                          <IconChevronDown />
                        ) : (
                          <IconChevronRight />
                        )
                      }
                      className={role === "parent-child" ? "ml-5" : ""}
                    />
                  ) : (
                    <div className="ml-[2.67rem]" />
                  )}
                  <div
                    className={`flex items-center w-full justify-between ml-2`}
                  >
                    <div>{`${
                      lingkup_pemeriksaan
                        ? lingkup_pemeriksaan
                        : risk
                        ? `${risk?.kode} - ${risk?.nama}`
                        : control
                        ? `${control?.kode} - ${control?.nama}`
                        : ""
                    }`}</div>
                    {role !== "child" ? (
                      <>
                        <ButtonIcon
                          icon={<Image src={ImageGroup} alt="" />}
                          handleClick={() => {
                            if (role === "parent") {
                              handleSelectedLingkupPemeriksaan(
                                id,
                                lingkup_pemeriksaan
                              );
                              handleClickAddRisk(id);
                            } else if (role === "parent-child") {
                              handleSelectedRisk(id, risk?.nama);
                              handleClickAddControl(id);
                            } else {
                              return;
                            }
                          }}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Cell>
              <Cell
                width="20%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {pic?.nama || ""}
              </Cell>
              <Cell
                width="15%"
                className="border-r cell-custom-dataTables justify-center"
              >
                {role === "child" ? (
                  <div className={uraian ? "" : "opacity-30"}>
                    <LinkIcon
                      icon={
                        <LozengeField appreance="inprogress" isBold>
                          URAIAN
                        </LozengeField>
                      }
                      href={`/ewp/konsulting/overview/10/perencanaan/program-kerja/${id}`}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Cell>
            </Row>
          )}
        />
      </TableTree>
      <div className="w-full border rounded-ee-lg rounded-es-lg">
        <div className="w-fit p-2">
          <ButtonField
            iconAfter={
              <div className="text-atlasian-purple">
                <IconPlus size="medium" />
              </div>
            }
            text={"Tambah Lingkup Pemeriksaan"}
            textColor={"purple"}
            handler={handleClickAddLingkupPemeriksaan}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePemeriksaan;
