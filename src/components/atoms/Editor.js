import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const EditorField = ({ contentData, ready, onChange }) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "sourceEditing",
        "|",
        "bold",
        "italic",
        "underline",
        "subscript",
        "superscript",
        "strikethrough",
        "specialCharacters",
        "|",
        "link",
        "|",
        "outdent",
        "indent",
        "|",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "-",
        "fontColor",
        "/",
        "fontFamily",
        "fontBackgroundColor",
        "highlight",
        "fontSize",
        "|",
        "horizontalLine",
        "pageBreak",
        "removeFormat",
        "-",
        "heading",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "|",
        "code",
        "imageInsert",
        "mathType",
        "tableColumn",
        "tableRow",
        "mergeTableCells",
      ],
      shouldNotGroupWhenFull: true,
    },
    language: "en",
    image: {
      toolbar: ["imageTextAlternative", "imageStyle:inline", "linkImage"],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
    licenseKey: "",
  };
  return (
    <div>
      {ready ? (
        <CKEditor
          editor={Editor}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          data={contentData}
          config={editorConfiguration}
        />
      ) : (
        <div>
          <p>Mohon tunggu</p>
        </div>
      )}
    </div>
  );
};

export default EditorField;
