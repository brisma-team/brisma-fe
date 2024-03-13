import { ButtonIcon, ModalScroll, TableField } from "@/components/atoms";
import useUser from "@/data/useUser";
import { checkRoleIsAdmin, confirmationSwal } from "@/helpers";
import ModalWorkflowHeader from "./ModalWorkflowHeader";
import ModalWorkflowFooter from "./ModalWorkflowFooter";
import TableTree, {
  Cell,
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";
import { useState } from "react";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import { DataNotFound } from "@/components/molecules/commons";
const customHeader = `w-full h-full flex items-center text-brisma font-bold`;
const customCell = `cell-width-full-height-full cell-custom-dataTables`;
const positionCenter = `w-full h-full flex items-center`;

const ModalWorkflow = ({
  workflowData,
  historyWorkflow,
  showModal,
  setShowModal,
  headerTitle,
  handleSubmit,
  handleAdd,
  handleChangeText,
  handleChangeSelect,
  handleDelete,
  handleCloseModal,
  validationErrors,
  widthHeader,
  isLogTableTree,
  isScrollHeader,
  isProposer,
  withSigner,
}) => {
  const { user } = useUser();
  let isApproval, isInitiator, isAdmin;
  isInitiator = user?.data?.pn == workflowData?.maker?.pn;
  isApproval = user?.data?.pn == workflowData?.on_approver?.pn;
  isAdmin = checkRoleIsAdmin(user?.data?.role_kode);

  const statusColors = {
    Approved: "text-atlasian-green",
    Rejected: "text-atlasian-red",
  };

  const [expansionMap, setExpansionMap] = useState({});

  const closeModal = async () => {
    const confirm = await confirmationSwal(
      "Apakah Anda ingin menutup modal ini?"
    );

    if (!confirm.value) {
      return;
    }

    setShowModal(false);
    handleCloseModal && handleCloseModal();
  };

  const toggleExpansion = (id, role) => {
    setExpansionMap((prevState) => ({
      ...prevState,
      [`${id}-${role}`]: !prevState[`${id}-${role}`],
    }));
  };

  return (
    <ModalScroll
      showModal={showModal}
      header={
        <ModalWorkflowHeader
          user={user?.data}
          data={workflowData}
          validationErrors={validationErrors}
          handleCloseModal={closeModal}
          showModal={showModal}
          headerTitle={headerTitle}
          handleAdd={handleAdd}
          handleChange={handleChangeSelect}
          handleDelete={handleDelete}
          width={widthHeader}
          isScrollHeader={isScrollHeader}
          withSigner={withSigner}
          isProposer={isProposer}
        />
      }
      footer={
        <ModalWorkflowFooter
          user={user?.data}
          data={workflowData}
          handleSubmit={handleSubmit}
          handleChangeText={handleChangeText}
        />
      }
      widthFullFooter={
        workflowData?.status_approver === "On Approver" && isApproval && true
      }
      withoutFooter={
        workflowData?.status_approver === "On Progress" && isInitiator
          ? false
          : workflowData?.status_approver === "On Approver" && isApproval
          ? false
          : workflowData?.maker?.pn === user?.data?.pn &&
            workflowData?.status_approver === "On Approver"
          ? false
          : workflowData?.status_approver === "On Progress" && isAdmin
          ? false
          : true
      }
    >
      <div className="w-[61rem] px-3">
        <p className="font-bold text-xl text-brisma">Riwayat Workflow</p>
        <div className="py-3">
          {isLogTableTree ? (
            <TableTree>
              <Headers>
                <Header className="!hidden" />
                <Header width="30%">
                  <div className={`${customHeader}`}>P.I.C</div>
                </Header>
                <Header width="35%" className="cell-custom-dataTables">
                  <div className={customHeader}>Alasan</div>
                </Header>
                <Header width="15%">
                  <div className={`${customHeader} justify-center text-center`}>
                    Tanggal
                  </div>
                </Header>
                <Header width="20%">
                  <div className={`${customHeader} justify-center text-center`}>
                    Status
                  </div>
                </Header>
              </Headers>
              {historyWorkflow?.length ? (
                <Rows
                  items={historyWorkflow}
                  render={({
                    id,
                    role,
                    pic,
                    alasan,
                    status,
                    tanggal,
                    children = [],
                  }) => (
                    <Row
                      role={role}
                      items={children}
                      hasChildren={children.length > 0}
                      isExpanded={Boolean(expansionMap[`${id}-${role}`])}
                    >
                      <Cell className="!hidden" />
                      <Cell width="30%" className={`${customCell}`}>
                        <div
                          className={`${positionCenter} justify-center gap-0.5`}
                        >
                          {role !== "child" ? (
                            <ButtonIcon
                              handleClick={() => toggleExpansion(id, role)}
                              icon={
                                expansionMap[`${id}-${role}`] ? (
                                  <IconChevronDown />
                                ) : (
                                  <IconChevronRight />
                                )
                              }
                            />
                          ) : (
                            <div className="ml-8" />
                          )}
                          <div
                            className={`flex items-center w-full justify-between ml-2`}
                          >
                            <div>{pic}</div>
                          </div>
                        </div>
                      </Cell>
                      <Cell width="35%" className={`${customCell}`}>
                        <div className={`${positionCenter} text-xs`}>
                          {alasan}
                        </div>
                      </Cell>
                      <Cell width="15%" className={`${customCell}`}>
                        <div
                          className={`${positionCenter} justify-center text-xs`}
                        >
                          {tanggal}
                        </div>
                      </Cell>
                      <Cell width="20%" className={`${customCell}`}>
                        <div
                          className={`${positionCenter} justify-center text-xs ${
                            status === "Approved"
                              ? `text-atlasian-green`
                              : status === "Rejected"
                              ? `text-atlasian-red`
                              : ``
                          }`}
                        >
                          {status}
                        </div>
                      </Cell>
                    </Row>
                  )}
                />
              ) : (
                <div className="w-full border-x border-b rounded-es-xl rounded-ee-xl pb-4">
                  <DataNotFound />
                </div>
              )}
            </TableTree>
          ) : (
            <TableField
              headers={["P.I.C", "Alasan", "Status", "Tanggal"]}
              columnWidths={["35%", "35%", "15%", "15%"]}
              items={historyWorkflow}
              customStyle={statusColors}
              customField={"Status"}
            />
          )}
        </div>
      </div>
    </ModalScroll>
  );
};

export default ModalWorkflow;
