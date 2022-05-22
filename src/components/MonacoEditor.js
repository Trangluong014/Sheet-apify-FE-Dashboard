import { useCallback, forwardRef } from "react";
import Editor from "@monaco-editor/react";

import AceEditor from "react-ace";
import CodeEditor from "@uiw/react-textarea-code-editor";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const MonacoEditor = forwardRef(({ onChange, value, name, ...props }, ref) => {
  const _onChange = useCallback(
    (e) => {
      onChange &&
        onChange({
          target: {
            name,
            value: e.target.value,
          },
        });
    },
    [onChange, name]
  );
  return (
    <CodeEditor
      ref={ref}
      name={name}
      onChange={_onChange}
      language="json"
      // defaultValue={value || "{\n\t\n}"}
      value={value}
      style={{
        width: "100%",
      }}
      minHeight={250}
      {...props}
    />
  );
});

export default MonacoEditor;
