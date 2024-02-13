import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useYearPAT = () => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/auditor/pat_year`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    yearPAT: data,
    yearPATError: error,
    yearPATMutate: mutate,
    yearPATIsLoading: isLoading,
  };
};

export default useYearPAT;
