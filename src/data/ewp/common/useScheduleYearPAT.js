import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useScheduleYearPAT = (module) => {
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/${
    module || undefined
  }/auditor/pat_year`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    scheduleYearPAT: data,
    scheduleYearPATError: error,
    scheduleYearPATMutate: mutate,
    scheduleYearPATIsLoading: isLoading,
  };
};

export default useScheduleYearPAT;
