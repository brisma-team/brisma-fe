import CardCategory from "./CardCategory";

const Sidebar = ({
  data,
  handleMutateData,
  handleUpdateCategory,
  handleDeleteCategory,
  handleOnEditCategory,
  handleChangeNameCategory,
}) => {
  return (
    <div className="w-[31rem] minfixed min-h-screen max-h-screen overflow-y-scroll border-x-2 border-slate-200 -mt-1.5 right-0">
      <div className="px-4 py-3 flex justify-between border-b-2 border-slate-200 bg-[#FAFBFC]">
        <p className="font-semibold text-base">Kategori</p>
      </div>
      <div className="px-4 pt-4 flex flex-col gap-4">
        {data?.length
          ? data?.map((category, idx) => {
              return (
                <CardCategory
                  key={idx}
                  data={category}
                  handleMutateData={handleMutateData}
                  handleUpdateCategory={handleUpdateCategory}
                  handleOnEditCategory={handleOnEditCategory}
                  handleChangeNameCategory={handleChangeNameCategory}
                  handleDeleteCategory={handleDeleteCategory}
                />
              );
            })
          : ""}
        {/* <CardCategory /> */}
      </div>
    </div>
  );
};

export default Sidebar;
