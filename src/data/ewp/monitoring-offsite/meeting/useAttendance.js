import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAttendance = (params) => {
  const { id } = params;
  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/meeting/attendance/${id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    attendance: data,
    attendanceError: error,
    attendanceMutate: mutate,
    attendanceIsLoading: isLoading,
  };
};

export default useAttendance;
