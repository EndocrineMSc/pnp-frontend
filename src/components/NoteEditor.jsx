import { useState } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import SubmitButton from "./basic-ui/SubmitButton";

const Editor = ({ text, endEdit }) => {
  const [editorContent, setEditorContent] = useState(text);

  const handler = () => {
    endEdit(editorContent);
  };

  return (
    <div className="flex flex-col items-end py-2 px-3">
      <QuillEditor
        className="mt-4 mb-2"
        theme="snow"
        value={editorContent}
        onChange={(newValue) => setEditorContent(newValue)}
      />
      <SubmitButton onClick={handler} text="Save" />
    </div>
  );
};

export default Editor;
