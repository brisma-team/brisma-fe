import { CloseModal, ModalScroll } from "@/components/atoms";
import { CardContent, ModalFooter } from "@/components/molecules/commons";

const ModalDetailPetugas = ({ payload, showModal, handleCloseModal }) => {
  return (
    <ModalScroll showModal={showModal} positionCenter>
      <div className="w-[44rem] relative">
        <CloseModal showModal={showModal} handleCloseModal={handleCloseModal} />
        <div className="text-2xl font-semibold mb-2">ASSIGNMENT DETAILS</div>
        <CardContent>
          <div className="">
            <p className="font-bold text-base">ASSIGNEE</p>
            {payload?.length ? (
              <ul className="list-disc w-full pl-3">
                {payload?.map((v, i) => {
                  return (
                    <li key={i} className="text-xs">
                      {v?.pn} - {v?.nama}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
        </CardContent>
      </div>
    </ModalScroll>
  );
};

export default ModalDetailPetugas;
