import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useListControl = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/mapa/lingkup_pemeriksaan/control/list/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    listControl: data,
    listControlError: error,
    listControlMutate: mutate,
    listControlIsLoading: isLoading,
  };
};

export default useListControl;
