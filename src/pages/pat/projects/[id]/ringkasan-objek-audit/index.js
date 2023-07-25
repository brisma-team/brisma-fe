import { Breadcrumbs, Card, PageTitle, TextInput } from "@/components/atoms";
import {
  CardTypeCount,
  PrevNextNavigation,
} from "@/components/molecules/commons";
import { PatLandingLayout } from "@/layouts/pat";
import TableTree from "@atlaskit/table-tree";
import { Box, xcss } from "@atlaskit/primitives";
import { IconClose } from "@/components/icons";

const styles = xcss({
  fontSize: "1rem",
  fontStyle: "normal",
  fontWeight: "revert",
});

const baseUrl = "/pat/projects/123";
const routes = [
  {
    name: "Latar Belakang",
    slug: "latar-belakang",
  },
  { name: "Tujuan", slug: "tujuan" },
  { name: "Sumber Informasi", slug: "sumber-informasi" },
  { name: "Tim Audit", slug: "tim-audit" },
  { name: "Target Audit", slug: "ringkasan-objek-audit" },
  { name: "Jadwal Audit", slug: "jadwal-audit" },
  { name: "Jadwal Kegiatan", slug: "jadwal-kegiatan" },
];

const breadcrumbs = [
  { name: "Menu", path: "/dashboard" },
  { name: "PAT", path: "/pat" },
  { name: "Overview", path: "/pat/projects" },
  { name: "PAT AIW BANTEN", path: "/pat/projects/123" },
  {
    name: "Ringkasan Objek Audit",
    path: "/pat/projects/123/ringkasan-objek-audit",
  },
];

const ukerAuditItems = [
  {
    content: {
      tipe_uker: "Regional Audit Office",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Branch Office",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Kantor Kas",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Divisi",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Regional Office",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Kantor Cabang Pembantu",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Unit Kerja Luar Negeri",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Perusahaan Anak",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Divisid",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
  {
    content: {
      tipe_uker: "Unit",
      uker_eksisting: <TextInput icon={<IconClose size="medium" />} />,
      uker_audit: "25",
      presentase: "25%",
    },
  },
];

const echannelItems = [
  {
    content: {
      tipe_echannel: "A.T.M",
      eksisting: <TextInput icon={<IconClose size="medium" />} />,
      audit: "55",
      presentase: "55%",
    },
  },
  {
    content: {
      tipe_echannel: "E.D.C",
      eksisting: <TextInput icon={<IconClose size="medium" />} />,
      audit: "55",
      presentase: "55%",
    },
  },
  {
    content: {
      tipe_echannel: "C.R.M",
      eksisting: <TextInput icon={<IconClose size="medium" />} />,
      audit: "55",
      presentase: "55%",
    },
  },
];

const ukerTipe = (props) => (
  <Box as="span" xcss={styles}>
    {props.tipe_uker}
  </Box>
);
const ukerEksisting = (props) => <Box as="span">{props.uker_eksisting}</Box>;
const ukerAudit = (props) => <Box as="span">{props.uker_audit}</Box>;
const ukerPresentase = (props) => <Box as="span">{props.presentase}</Box>;

const echannelTipe = (props) => (
  <Box as="span" xcss={styles}>
    {props.tipe_echannel}
  </Box>
);
const echannelEksisting = (props) => <Box as="span">{props.eksisting}</Box>;
const echannelAudit = (props) => <Box as="span">{props.audit}</Box>;
const echannelPresentase = (props) => <Box as="span">{props.presentase}</Box>;

const index = () => {
  return (
    <PatLandingLayout>
      <div className="pr-44">
        <Breadcrumbs data={breadcrumbs} />
        <div className="flex justify-between items-center mb-6">
          <PageTitle text={"Ringkasan Objek Audit"} />
          <PrevNextNavigation baseUrl={baseUrl} routes={routes} />
        </div>
        <div className="flex justify-end items-end gap-2">
          <CardTypeCount
            title={"REGULER"}
            total={2}
            percent={75}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"SPECIAL"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"TEMATIK"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
          <CardTypeCount
            title={"KONSULTING"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />

          <CardTypeCount
            title={"LAIN-LAIN"}
            total={1}
            percent={25}
            width={"w-[12.8rem]"}
          />
        </div>
        {/* Start Content */}
        <div className="flex gap-3 mt-6">
          <div className="w-[52rem] -my-3">
            <div className="h-[35rem] my-3">
              <Card>
                <div className="w-full h-full px-6">
                  <div className="text-xl font-bold p-2">Unit Kerja Audit</div>
                  <div className="mt-6 max-h-[29rem] overflow-y-scroll px-2">
                    <TableTree
                      columns={[
                        ukerTipe,
                        ukerEksisting,
                        ukerAudit,
                        ukerPresentase,
                      ]}
                      headers={[
                        "Tipe UKER",
                        "UKER Eksisting",
                        "UKER Audit",
                        "Presentase",
                      ]}
                      columnWidths={["40%", "20%", "20%", "20%"]}
                      items={ukerAuditItems}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="h-[5rem] my-3">
              <Card>
                <div className="w-full h-full px-6 flex items-center">
                  <div className="w-full h-[3.125rem] flex text-lg border-y border-[#DFE1E6]">
                    <div className="w-2/5 ml-8 font-black flex items-center">
                      Total
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                      100
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                      25
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                      25%
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="w-[37rem] -my-3">
            <div className="h-[16.5rem] my-3">
              <Card>
                <div className="w-full h-full px-6">
                  <div className="text-xl font-bold p-2">E-Channel Audit</div>
                  <div className="mt-6 max-h-[10.5rem] overflow-y-scroll px-2">
                    <TableTree
                      columns={[
                        echannelTipe,
                        echannelEksisting,
                        echannelAudit,
                        echannelPresentase,
                      ]}
                      headers={[
                        "Tipe E-Channel",
                        "Eksisting",
                        "Audit",
                        "Presentase",
                      ]}
                      columnWidths={["30%", "30%", "20%", "20%"]}
                      items={echannelItems}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <div className="h-[5rem] my-3">
              <Card>
                <div className="w-full h-full px-6 flex items-center">
                  <div className="w-full h-[3.125rem] flex text-base border-y border-[#DFE1E6]">
                    <div className="w-2/5 ml-8 font-black flex items-center">
                      Total
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-green">
                      100
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-yellow">
                      25
                    </div>
                    <div className="w-1/5 ml-2 font-semibold flex items-center text-atlasian-dark">
                      25%
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        {/* End Content */}
      </div>
    </PatLandingLayout>
  );
};

export default index;
