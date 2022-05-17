import { useCallback, forwardRef } from "react";
import Editor from "@monaco-editor/react";

const MonacoEditor = forwardRef(({onChange, value, name, ...props}, ref) => {
  const _onChange = useCallback((value, e) => {
    console.log(e);
    onChange && onChange({
      target: {
        name,
        value,
      }
    });
  }, [onChange]);
  return <Editor
    name={name}
    onChange={_onChange}
    height="200px"
    defaultLanguage="json"
    defaultValue={value || "{\n\t\n}"}
    value={value}
    options={{
      minimap: false,
    }}
    {...props}
  />
});

export default MonacoEditor