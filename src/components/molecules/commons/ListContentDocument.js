import { Card } from "@/components/atoms";
import NavigationDocument from "./NavigationDocument";

const ListContentDocument = ({ data, currentPosition, handleActiveIndex }) => {
  return (
    <div className="w-64 h-fit">
      <Card>
        <div className="px-3 py-1 w-full">
          <p className="text-xl">Daftar Isi</p>
          <div className="pl-2 mt-0.5">
            {data.map((v, i) => {
              return (
                <NavigationDocument
                  key={i}
                  no={i + 1}
                  title={v.title}
                  handleClick={() => handleActiveIndex(v.idx)}
                  activeIndex={currentPosition}
                  count={v?.total_comment}
                />
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ListContentDocument;
