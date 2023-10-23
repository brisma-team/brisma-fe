const cardWithHeaderLine = ({ children, title }) => {
  return (
    <div
      className="w-full rounded flex flex-col items-center h-full border-slate-700"
      style={{
        borderRadius: "10px",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
        <div className="border-b-2 w-full flex px-4 py-2">
          <p className="text-base text-brisma font-semibold">{title}</p>
        </div>
         <div className="w-full px-4 py-4">
         {children}
         </div>
    </div>
  );
};

export default cardWithHeaderLine;
