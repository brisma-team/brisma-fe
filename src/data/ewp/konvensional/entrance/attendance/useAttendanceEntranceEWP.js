import withTokenFetcher from "@/fetchers/withTokenFetcher";
import useSWR from "swr";

const useAttendanceEntranceEWP = (params) => {
  const { id, attendance_id } = params;

  const path = `${process.env.NEXT_PUBLIC_API_URL_EWP}/ewp/entrance/entrance/${attendance_id}`;
  const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

  return {
    attendanceEntranceEWP: data,
    attendanceEntranceEWPError: error,
    attendanceEntranceEWPMutate: mutate,
    attendanceEntranceEWPIsLoading: isLoading,
  };
};

export default useAttendanceEntranceEWP;
