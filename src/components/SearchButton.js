import React from "react";
import Button from "@atlaskit/button";
import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search'

export default function SearchButton() {
	return (
		<Button
			iconBefore={<EditorSearchIcon/>}
			type="submit"
			appearance="primary"
			shouldFitContainer
			>
				Cari
		</Button>
	);
}
