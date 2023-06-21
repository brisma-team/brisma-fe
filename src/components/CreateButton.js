import React from "react";
import Button from "@atlaskit/button";
import EditorAddIcon from "@atlaskit/icon/glyph/editor/add"

export default function CreateButton({ href, text, icon, color }) {
	return (
		<div className={color ? color : ""}>
			<Button
				href={href}
				iconBefore={ icon ? icon : <EditorAddIcon/> }
				shouldFitContainer
				> 
					{text ? text : "Tambah"}
			</Button>
		</div>
			
	);
}