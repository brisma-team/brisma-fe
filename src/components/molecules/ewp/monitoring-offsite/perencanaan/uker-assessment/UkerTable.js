import { ButtonField, ButtonIcon } from "@/components/atoms";
import {
  IconAttachment,
  IconClose,
  IconInfo,
  IconPlus,
  IconQuestions,
} from "@/components/icons";
import {
  BranchSelect,
  ButtonDelete,
  ButtonEdit,
  ButtonSave,
  DataNotFound,
  OrgehSelect,
  UkerTypeSelect,
} from "@/components/molecules/commons";
import TableTree, {
  Cell, 
  Header,
  Headers,
  Row,
  Rows,
} from "@atlaskit/table-tree";

const customCell = `cell-width-full-height-full cell-custom-dataTables`;

const UkerTable = ({
  data,
  handleChange,
  handleReset,
  handleClickSave,
  handleClickDelete,
  handleClickUpdate,
  handleClickAddMatrix,
  handleClickAssessmentInformation,
  handleClickDescription,
  handleClickAttachment,
}) => {
  console.log(data)
  return (
		<TableTree>
			<Headers>
				<Header
					width="10%"
					className="border-x border-t rounded-ss-lg cell-custom-dataTables"
				>
					<div
						className={`custom-table-header justify-center text-sm font-semibold`}
					>
						AKSI
					</div>
				</Header>
				<Header
					width="25%"
					className="border-t border-r cell-custom-dataTables"
				>
					<div className="custom-table-header text-sm font-semibold">
						TIPE UKER
					</div>
				</Header>
				<Header
					width="25%"
					className="border-t border-r cell-custom-dataTables"
				>
					<div className="custom-table-header justify-center text-sm font-semibold">
						BRANCH
					</div>
				</Header>
				<Header
					width="20%"
					className="border-t border-r cell-custom-dataTables"
				>
					<div className="custom-table-header justify-center text-sm font-semibold">
						ORGEH
					</div>
				</Header>
				<Header
					width="20%"
					className="border-t border-r cell-custom-dataTables rounded-se-lg"
				>
					<div className="custom-table-header text-sm font-semibold justify-center">
						INFORMASI
					</div>
				</Header>
			</Headers>
			{data?.length ? (
				<Rows
					items={data}
					render={({
						id,
						ref_auditee_branch_name,
						ref_auditee_branch_kode,
						ref_auditee_orgeh_name,
						ref_auditee_orgeh_kode,
						tipe_uker,
						is_new,
					}) => (
						<Row>
							<Cell
								width="10%"
								className={`border-x ${customCell}`}
							>
								<div className="custom-table-position-center justify-center gap-1">
									{is_new ? (
										<ButtonIcon
											icon={<ButtonSave />}
											handleClick={handleClickSave}
										/>
									) : (
										<>
											<ButtonIcon
												icon={<ButtonDelete />}
												handleClick={() =>
													handleClickDelete(id)
												}
											/>
                      <ButtonIcon
												icon={<ButtonEdit />}
												handleClick={() =>
													handleClickUpdate(id)
												}
											/>
										</>
									)}
								</div>
							</Cell>
							<Cell
								width="25%"
								className={`border-r ${customCell}`}
							>
								<div className="custom-table-position-center">
									{is_new ? (
										<BranchSelect
											customIcon={
												<ButtonIcon
													icon={<IconClose />}
													handleClick={() =>
														handleReset("branch")
													}
												/>
											}
											handleChange={(e) =>
												handleChange("branch", e?.value)
											}
											selectedValue={tipe_uker}
										/>
									) : (
										<p className="text-base">{`${tipe_uker}`}</p>
									)}
								</div>
							</Cell>
							<Cell
								width="25%"
								className={`border-r ${customCell}`}
							>
								<div className="custom-table-position-center justify-center">
									{is_new ? (
										<OrgehSelect
											customIcon={
												<ButtonIcon
													icon={<IconClose />}
													handleClick={() =>
														handleReset("orgeh")
													}
												/>
											}
											handleChange={(e) =>
												handleChange("orgeh", e?.value)
											}
											selectedValue={
												ref_auditee_branch_name
											}
										/>
									) : (
										<p className="text-base">{`${ref_auditee_branch_kode} - ${ref_auditee_branch_name}`}</p>
									)}
								</div>
							</Cell>
							<Cell
								width="20%"
								className={`border-r ${customCell}`}
							>
								<div className="custom-table-position-center justify-center">
									{is_new ? (
										<UkerTypeSelect
											handleChange={(e) =>
												handleChange("uker_type", {
													kode: e?.value,
													name: e?.label,
												})
											}
											selectedValue={tipe_uker}
										/>
									) : (
										<p className="text-base">{`${ref_auditee_orgeh_kode} - ${ref_auditee_orgeh_name}`}</p>
									)}
								</div>
							</Cell>
							<Cell
								width="20%"
								className={`border-r ${customCell}`}
							>
								<div className="custom-table-position-center justify-center gap-4">
									<ButtonIcon
										color={"blue"}
										icon={<IconQuestions />}
										handleClick={() =>
											handleClickDescription(id)
										}
									/>
									<ButtonIcon
										icon={<IconInfo />}
										color={"blue"}
										handleClick={() =>
											handleClickAssessmentInformation(id)
										}
									/>
									<ButtonIcon
										color={"blue"}
										icon={<IconAttachment />}
										handleClick={() =>
											handleClickAttachment(id)
										}
									/>
								</div>
							</Cell>
						</Row>
					)}
				/>
			) : (
				<div className="w-full border-x border-b pb-3">
					<DataNotFound />
				</div>
			)}
			<div className="flex justify-end w-full border-x border-b rounded-es-xl rounded-ee-xl">
				<div className="w-48 text-sm font-semibold p-2 my-1">
					<ButtonField
						iconAfter={
							<div className="text-atlasian-purple">
								<IconPlus size="medium" />
							</div>
						}
						text={"Tambah UKER"}
						textColor={"purple"}
						handler={handleClickAddMatrix}
					/>
				</div>
			</div>
		</TableTree>
  );
};

export default UkerTable;
