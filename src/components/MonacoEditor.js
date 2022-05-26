import { useCallback, forwardRef } from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";

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
