import errorSwal from "./errorSwal";
import successSwal from "./successSwal";
const copyToClipboard = (text, successMessage) => {
  // Create a hidden textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;
  // Make sure the textarea is not visible and does not cause any scrolling issues
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  // Append the textarea to the document body
  document.body.appendChild(textarea);
  // Select the text in the textarea
  textarea.select();
  // Try to copy the text to the clipboard
  try {
    document.execCommand("copy");
    // Show success message if copy was successful
    successSwal(successMessage || "Copy to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
    errorSwal("Link project gagal disalin ke clipboard.");
  } finally {
    // Remove the textarea from the document
    document.body.removeChild(textarea);
  }
};

export default copyToClipboard;
