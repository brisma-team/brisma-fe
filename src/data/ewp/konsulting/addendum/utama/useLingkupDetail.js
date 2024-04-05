import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useLingkupDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/sbp/addendum/program_kerja/lingkup/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    lingkupDetail: data,
    lingkupDetailError: error,
    lingkupDetailMutate: mutate,
    lingkupDetailIsLoading: isLoading,
  };
};

export default useLingkupDetail;
