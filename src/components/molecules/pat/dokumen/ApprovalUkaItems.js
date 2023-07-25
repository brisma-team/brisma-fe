const ApprovalUkaItems = ({ title, text }) => {
  return (
    <div className="my-3">
      <p className="text-brisma text-base font-semibold">{title}</p>
      {Array.isArray(text) ? (
        text.map((v, i) => {
          return (
            <div key={i} className="font-brisma text-base my-0.5">
              {v}
            </div>
          );
        })
      ) : (
        <div className="font-brisma text-base my-0.5">Annisa Damayana</div>
      )}
    </div>
  );
};

export default ApprovalUkaItems;
