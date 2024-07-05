import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useWorkingAgreements = (params) => {
  const { id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/agile/assesment/working_aggreements/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    workingAgreements: data,
    workingAgreementsError: error,
    workingAgreementsMutate: mutate,
    workingAgreementsIsLoading: isLoading,
  };
};

export default useWorkingAgreements;
