import { Card } from "@/components/atoms";
const ProjectInfo = () => {
  return (
    <div className="mt-5 mr-40">
      <Card>
        <div className="w-full h-full px-6 p-5">
          <div className="grid grid-cols-5">
            <div className="col-span-1 font-bold text-lg">Projek ID</div>
            <div className="col-span-4">: 001</div>
            <div className="col-span-1 font-bold text-lg">Nama Projek</div>
            <div className="col-span-4">: -</div>
            <div className="col-span-1 font-bold text-lg">Tahun</div>
            <div className="col-span-4">: 2023</div>
            <div className="col-span-1 font-bold text-lg">Jenis Audit</div>
            <div className="col-span-4">: Reguler</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectInfo;
