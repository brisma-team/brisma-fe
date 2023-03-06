import withTokenFetcher from "@/fetchers/withTokenFetcher";

import useSWR from "swr";

export default function useRole() {
	const path = `${process.env.NEXT_PUBLIC_API_URL_SUPPORT}/reference/user_role/all`;
	const { data, error, mutate, isLoading } = useSWR(path, withTokenFetcher);

	return {
		role: data,
		roleError: error,
		roleMutate: mutate,
		roleIsLoading: isLoading,
	};
}
