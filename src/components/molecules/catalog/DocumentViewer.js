import { Card } from "@/components/atoms";
import Button from "@atlaskit/button";
const DocumentViewer = ({
  documentTitle = `Document`,
  documentStyle = ``,
  documentHtml,
  isLoading = false,
}) => {
  const handlePrint = () => {
    window.frames["content-doc"].focus();
    window.frames["content-doc"].contentWindow.print();
  };

  let watermark = [];

  for (let index = 0; index < 94; index++) {
    watermark.push(`00136165 - I Putu Andeandika`);
  }
  const documentMap = (style, body) => {
    return `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>${documentTitle}</title>
                <style>
                    body:before {
                        content: '${watermark.join(" ")}';
                        position: fixed;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: -1;
                        
                        text-align: justify;
                        line-height: 50px;
                        color: #aaaaaa;
                        font-weight: 500px;
                        opacity: 0.2;
                    }
                    ${style}
                </style>
            </head>
            <body>
                ${body}
            </body>
        </html>    
    `;
  };
  return (
    <>
      <div className="flex mb-5 gap-2">
        <Button appearance="warning" onClick={handlePrint}>
          Generate to PDF
        </Button>
        <Button appearance="primary">Generate to Docx</Button>
      </div>
      <div className="w-[70rem] gap-6">
        <div>
          <Card>
            <div
              className={`overflow-y-scroll my-2 ${isLoading ? "blur-sm" : ""}`}
            >
              <div>
                <div className="h-full w-full ">
                  <iframe
                    title="frame document"
                    id="content-doc"
                    className="content-doc w-[70rem]"
                    srcDoc={documentMap(documentStyle, documentHtml)}
                    style={{ minHeight: "29.7cm", padding: "20px" }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DocumentViewer;
