import { useCallback, forwardRef } from "react";

import _capitalize from "lodash/capitalize";
import _set from "lodash/set";

import { Typography, Box, Input } from "@mui/material";
import { TreeView, TreeItem } from "@mui/lab";

import { styled } from "@mui/material/styles";
import { treeItemClasses } from "@mui/lab/TreeItem";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import ImageUpload from "./ImageUpload";

const TEST_TEMPLATE = {
  __meta: {
    label: "Configuration",
  },
  logo: {
    __meta: {
      label: "Logo",
      description: "Logo of the website",
      type: "image",
    },
  },
  monthsToLoad: {
    __meta: {
      label: "Months to load",
      type: "number",
    },
  },
  theme: {
    __meta: {
      description: "Change the looks of this template",
    },
    primary: {
      __meta: {
        label: "Primary",
        type: "color",
        defaultValue: "#1976d2",
      },
    },
  },
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelText,
    labelSubtext,
    action,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <div style={{ fontWeight: "inherit", flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
              {labelText}
            </Typography>
            {labelSubtext && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "inherit", fontSize: ".8em" }}
              >
                {labelSubtext}
              </Typography>
            )}
          </div>
          {action && <div>{action}</div>}
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

function ConfigurationLevel({ levelKey, template, nodeId, value, onChange }) {
  const { __meta: meta, ...rest } = template;
  const { description, type, defaultValue } = meta || {};
  const displayLabel = meta?.label || _capitalize(levelKey);
  const renderByType = (type) => {
    switch (type) {
      case "color":
        // console.log(type, value, defaultValue, meta);
        return [
          "action",
          <input
            type="color"
            value={value || defaultValue}
            onChange={onChange}
            name={levelKey}
          />,
        ];
      case "image":
        return [
          "action",
          <ImageUpload value={value} onChange={onChange} name={levelKey} />,
        ];
      case undefined:
        return [
          "children",
          <>
            {Object.keys(rest).map((itemKey, idx) => (
              <ConfigurationLevel
                key={`${nodeId}_${idx}`}
                levelKey={levelKey ? `${levelKey}.${itemKey}` : itemKey}
                template={rest[itemKey]}
                nodeId={`${nodeId}_${idx}`}
                value={(value || {})[itemKey]}
                onChange={onChange}
              />
            ))}
          </>,
        ];
      default:
        return [
          "action",
          <Input
            type={type}
            value={value}
            onChange={onChange}
            name={levelKey}
          />,
        ];
    }
  };

  const [contentType, content] = renderByType(type);

  return (
    <StyledTreeItem
      nodeId={nodeId}
      labelText={displayLabel}
      labelSubtext={description}
      action={contentType === "action" ? content : null}
    >
      {contentType === "children" ? content : null}
    </StyledTreeItem>
  );
}

const ConfigurationEditor = forwardRef(
  ({ name, value, onChange, template = TEST_TEMPLATE }, ref) => {
    const handleOnChange = useCallback(
      (e) => {
        if (onChange) {
          const { name: itemName, value: newValue } = e.target;
          const changedValue = _set({ ...value }, itemName, newValue);
          console.log(changedValue);
          onChange({
            target: {
              name,
              value: changedValue,
            },
          });
        }
      },
      [value, onChange, name]
    );

    return (
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: "100%", overflowY: "auto" }}
      >
        <ConfigurationLevel
          template={template}
          nodeId="0"
          value={value}
          onChange={handleOnChange}
        />
      </TreeView>
    );
  }
);

export const filterAddtionalConfig = (config, template) => {
  const templateKeys = Object.keys(template);
  const returnValue = { ...config };
  Object.keys(returnValue).forEach((returnKey) => {
    if (templateKeys.indexOf(returnKey)) {
      delete returnValue[returnKey];
    }
  });
  return returnValue;
};

export default ConfigurationEditor;
