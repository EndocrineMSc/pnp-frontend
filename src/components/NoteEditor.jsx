import { useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import SubmitButton from "./basic-ui/SubmitButton";
import sanitizeHtml from "sanitize-html";

const Editor = ({ text, endEdit }) => {
  const [editorContent, setEditorContent] = useState(text);

  const handler = () => {
    const newContent = sanitizeHtml(editorContent);
    endEdit(newContent);
  };

  return (
    <div>
      <QuillEditor
        theme="snow"
        value={editorContent}
        onChange={(newValue) => setEditorContent(newValue)}
      />
      <SubmitButton onClick={handler} text="Save" />
    </div>
  );
};

export default Editor;
