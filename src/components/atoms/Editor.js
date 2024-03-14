import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

const EditorField = ({ contentData, ready, onChange }) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        "heading",
        "|",
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
        "bulletedList",
        "numberedList",
        "todoList",
        "|",
        "alignment",
        "|",
        "outdent",
        "indent",
        "|",
        "blockQuote",
        "insertTable",
        "undo",
        "redo",
        "fontColor",
        "fontFamily",
        "fontBackgroundColor",
        "fontSize",
        "|",
        "horizontalLine",
        "pageBreak",
        "removeFormat",
        "findAndReplace",
        "|",
        "imageInsert",
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
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    mediaEmbed: {
      toolbar: ["mediaEmbed"],
    },
    removePlugins: ["elementspath"],
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
