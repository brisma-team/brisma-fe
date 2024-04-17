import { Card } from "@/components/atoms";

const ContentView = ({ dataDoc }) => {
  return (
    <Card>
      <div className="overflow-y-scroll my-2 parent max-h-[40rem] flex flex-col">
        <div className={`page-container-a4 shrink-0 `}>
          <div className="px-4 h-full w-full relative page-content-a4">
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{
                __html: dataDoc,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContentView;
