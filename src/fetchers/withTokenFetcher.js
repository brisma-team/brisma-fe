import withTokenConfig from "@/helpers/withTokenConfig";

import axios from "axios";

export default async function withTokenFetcher(url) {
	const response = await axios.get(url, withTokenConfig());

	return response.data;
}
