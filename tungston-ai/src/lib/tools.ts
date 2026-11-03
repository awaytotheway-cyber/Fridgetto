import toolList from "./tools.json";
import { toolIcons } from "./tool-icons";

/** The id of any tool in tools.json. Using one that does not exist is a type error. */
export type ToolId = keyof typeof toolList;

export type Tool = {
  name: string;
  /** Logo path and the colour it takes on hover. Absent for tools shown by name only. */
  icon?: { path: string; hover: string };
};

/** A tool's display name and, where one is licensed for use, its logo. */
export function getTool(id: ToolId): Tool {
  const entry = toolList[id] as { name: string; icon?: string };
  return { name: entry.name, icon: entry.icon ? toolIcons[id] : undefined };
}

/** A named set of tools, e.g. the CRMs a service connects to. */
export type ToolGroup = { label: string; tools: ToolId[] };
