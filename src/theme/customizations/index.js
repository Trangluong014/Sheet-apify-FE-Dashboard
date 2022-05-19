import Card from "./Card";
import Link from "./Link";

function customizeComponents(theme) {
  return { ...Card(theme), ...Link(theme) };
}

export default customizeComponents;
