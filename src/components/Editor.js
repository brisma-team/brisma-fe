import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const Editor = ({ contentData, ready, onChange }) => {
  return (
    <div>
      {ready ? (
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          data={contentData}
          config={{
            placeholder: "Click here to start typing",
          }}
        />
      ) : (
        <div>
          <p>Mohon tunggu</p>
        </div>
      )}
    </div>
  );
};

export default Editor;
