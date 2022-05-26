import { useRef, useCallback } from "react";
import { Button } from "@mui/material";

function ImageUpload({ name, value, onChange, ...buttonProps }) {
  const inputRef = useRef();
  const handleChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file && onChange) {
        const reader = new FileReader();

        const onReaderLoad = function () {
          onChange({
            target: {
              name,
              value: reader.result,
            },
          });
        };
        reader.addEventListener("load", onReaderLoad);
        reader.readAsDataURL(file);
      }
    },
    [onChange, name]
  );
  const handleOnClick = useCallback(
    (e) => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    },
    [inputRef]
  );
  return (
    <>
      <input
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
      <Button onClick={handleOnClick} {...buttonProps}>
        {value && <img src={value} alt="value" style={{ maxWidth: 32 }} />}
        Upload
      </Button>
    </>
  );
}

export default ImageUpload;
