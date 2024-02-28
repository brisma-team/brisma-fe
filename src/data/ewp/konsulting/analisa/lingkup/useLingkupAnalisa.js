import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupAnalisa = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/kkpa/list/${id}?is_na`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupAnalisa: data,
    lingkupAnalisaError: error,
    lingkupAnalisaMutate: mutate,
    lingkupAnalisaIsLoading: isLoading,
  };
};

export default useLingkupAnalisa;
