import { Card } from "@/components/atoms";

const CardContentRekomendasi = ({ data }) => {
  return (
    <Card>
      <div className="px-4 py-2 flex flex-col gap-3 w-full">
        <div className="flex flex-col gap-0.5">
          <div className="text-sm text-brisma font-bold">
            OBJEK TINDAK LANJUT
          </div>
          <div className="text-sm text-brisma">
            {`[${data?.object?.id}] ${data?.object?.name}`}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm text-brisma font-bold">SURVEY TERKAIT</div>
          <div className="text-sm text-brisma">
            {data?.survey?.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm text-brisma font-bold">UKER</div>
          <div className="text-sm text-brisma">{`[${data?.uker?.ref_auditee_orgeh_kode}][${data?.uker?.ref_auditee_branch_kode}] - ${data?.uker?.ref_auditee_branch_name}`}</div>
        </div>
      </div>
    </Card>
  );
};

export default CardContentRekomendasi;
