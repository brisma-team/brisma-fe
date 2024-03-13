import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useMeetingDetail = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/detail/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    meetingDetail: data,
    meetingDetailError: error,
    meetingDetailMutate: mutate,
    meetingDetailIsLoading: isLoading,
  };
};

export default useMeetingDetail;
