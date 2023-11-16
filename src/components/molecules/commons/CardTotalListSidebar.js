import { Card } from "@/components/atoms";
const CardTotalListSidebar = ({ data }) => {
  return data?.length ? (
    <div className="px-5 flex flex-col gap-5">
      {data?.map((v, i) => {
        return (
          <div key={i} className="w-full">
            <Card>
              <p className={`${v.color} text-3xl font-semibold`}>{v.total}</p>
              <p className={`${v.color} text-base font-semibold -mt-1`}>
                {v.name}
              </p>
            </Card>
          </div>
        );
      })}
    </div>
  ) : (
    ""
  );
};

export default CardTotalListSidebar;
