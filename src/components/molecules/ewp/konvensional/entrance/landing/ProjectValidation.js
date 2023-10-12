import { Breadcrumbs, ButtonField, Card, PageTitle } from "@/components/atoms";
import TableProjectChecklist from "./TableProjectChecklist";
import { useRouter } from "next/router";
import { useAuditorEWP } from "@/data/ewp/konvensional";

const ProjectValidation = () => {
  const { id } = useRouter().query;
  const router = useRouter();
  const { auditorEWP } = useAuditorEWP({ id });
  const breadcrumbs = [
    { name: "Menu", path: "/dashboard" },
    { name: "EWP", path: "/ewp" },
    {
      name: `${auditorEWP?.data?.project_info?.project_id} / Entrance Meeting`,
      path: `/ewp/projects/konvensional/${id}/entrance`,
    },
  ];

  return (
    <>
      <Breadcrumbs data={breadcrumbs} />
      <div className="flex justify-between items-center mb-6">
        <PageTitle text="Entrance Meeting" />
      </div>
      <div className="flex gap-3 w-[60rem]">
        <div className="w-7/12">
          <Card>
            <div className="px-4 w-full">
              <div className="text-brisma text-base font-bold ml-2 mb-1.5">
                Project Checklist
              </div>
              <TableProjectChecklist data={[{ a: "test" }]} />
            </div>
          </Card>
          <div className="w-full flex gap-3 justify-end items-center mt-2">
            <div className="rounded w-28 bg-atlasian-blue-light">
              <ButtonField
                text={"Project Info"}
                handler={() =>
                  router.push(`/ewp/projects/konvensional/${id}/info`)
                }
              />
            </div>
            <div className="rounded w-28 bg-atlasian-green">
              <ButtonField text={"Inisiasi"} />
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <Card>
            <div className="px-4">
              <p className="text-xl text-atlasian-yellow font-bold">
                PERHATIAN
              </p>
              <p className="text-base">
                Setelah berhasil inisiasi <b>Enterance Meeting</b>, anda tidak
                dapat lagi mengubah M.A.P.A <br />
                <br />
                Perubahan M.A.P.A akan dapat dilakukan pada menu{" "}
                <b>Addendum M.A.P.A</b> yang hanya dapat di-inisiasi oleh{" "}
                <b>Ketua Tim Audit</b>. <br />
                <br />
                Inisiasi dapat dilakukan pada menu <b>Project Info</b>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProjectValidation;
