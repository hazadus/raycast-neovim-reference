import { Action, ActionPanel, Detail, Icon, List, showToast, Toast } from "@raycast/api";
import { useMemo, useState } from "react";
import { nvimCommands } from "./commands";
import type { NeovimCommand } from "./types";
import { usageKey, useUsageStats, type UsageCounts } from "./use-usage-stats";

const FREQUENT_LIMIT = 10;
const EXPORT_LIMIT = 30;
const MODES: NeovimCommand["mode"][] = ["Normal", "Insert", "Visual", "Cmdline"];

function getModeIcon(mode: string): string {
  switch (mode) {
    case "Normal":
      return "🟢";
    case "Insert":
      return "🔵";
    case "Visual":
      return "🟡";
    case "Cmdline":
      return "🔴";
    default:
      return "⚪";
  }
}

function getModeColor(mode: string): string {
  switch (mode) {
    case "Normal":
      return "#00FF00";
    case "Insert":
      return "#0080FF";
    case "Visual":
      return "#FFD700";
    case "Cmdline":
      return "#FF4500";
    default:
      return "#808080";
  }
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case "Navigation":
      return "🧭";
    case "Editing":
      return "✏️";
    case "Search":
      return "🔍";
    case "Windows":
      return "🪟";
    case "Files":
      return "📁";
    case "Text Objects":
      return "📝";
    case "Misc":
      return "⚙️";
    default:
      return "📋";
  }
}

// Markdown-шпаргалка: самые используемые команды, сгруппированные по режимам
function buildCheatSheet(counts: UsageCounts): string {
  const top = nvimCommands
    .filter((cmd) => (counts[usageKey(cmd)] ?? 0) > 0)
    .sort((a, b) => counts[usageKey(b)] - counts[usageKey(a)])
    .slice(0, EXPORT_LIMIT);

  if (top.length === 0) return "# Neovim Cheat Sheet\n\nNo usage data yet.";

  const sections = MODES.map((mode) => {
    const rows = top.filter((cmd) => cmd.mode === mode);
    if (rows.length === 0) return "";
    const lines = rows.map((cmd) => `| \`${cmd.command}\` | ${cmd.description} | ${counts[usageKey(cmd)]} |`);
    return `## ${mode}\n\n| Command | Description | Uses |\n| --- | --- | --- |\n${lines.join("\n")}`;
  }).filter(Boolean);

  return `# Neovim Cheat Sheet\n\n${sections.join("\n\n")}\n`;
}

const uniqueCategories = Array.from(new Set(nvimCommands.map((cmd) => cmd.category)));

export default function Command() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchText, setSearchText] = useState("");
  const { counts, increment } = useUsageStats();

  // Фильтруем команды по выбранной категории
  const filteredCommands =
    selectedCategory === "all" ? nvimCommands : nvimCommands.filter((cmd) => cmd.category === selectedCategory);

  // Секция «Frequently Used» показывается только при пустом поиске
  const frequentCommands = useMemo(() => {
    if (searchText) return [];
    return filteredCommands
      .filter((cmd) => (counts[usageKey(cmd)] ?? 0) > 0)
      .sort((a, b) => counts[usageKey(b)] - counts[usageKey(a)])
      .slice(0, FREQUENT_LIMIT);
  }, [filteredCommands, counts, searchText]);
  const otherCommands =
    frequentCommands.length > 0 ? filteredCommands.filter((cmd) => !frequentCommands.includes(cmd)) : filteredCommands;

  const cheatSheet = useMemo(() => buildCheatSheet(counts), [counts]);

  const markAsUsed = (item: NeovimCommand) => {
    increment(item);
    showToast({ style: Toast.Style.Success, title: "Marked as used", message: item.command });
  };

  const renderItem = (item: NeovimCommand) => {
    return (
      <List.Item
        key={item.command + item.mode}
        title={item.command}
        subtitle={item.description}
        icon={getModeIcon(item.mode)}
        keywords={[item.category, ...(item.keywords || [])]}
        detail={
          <List.Item.Detail
            markdown={`# ${item.command}

${item.description}

${item.example ? `## Example Usage\n\n${item.example}` : ""}

${item.related && item.related.length > 0 ? `## Related Commands\n\n${item.related.map((cmd) => `\`${cmd}\``).join(" • ")}` : ""}`}
            metadata={
              <Detail.Metadata>
                <Detail.Metadata.Label title="Command" text={item.command} icon="💻" />
                <Detail.Metadata.Separator />
                <Detail.Metadata.TagList title="Mode">
                  <Detail.Metadata.TagList.Item
                    text={item.mode}
                    color={getModeColor(item.mode)}
                    icon={getModeIcon(item.mode)}
                  />
                </Detail.Metadata.TagList>
                <Detail.Metadata.Separator />
                <Detail.Metadata.Label title="Category" text={item.category} icon={getCategoryIcon(item.category)} />
                {item.keywords && item.keywords.length > 0 && (
                  <>
                    <Detail.Metadata.Separator />
                    <Detail.Metadata.TagList title="Tags">
                      {item.keywords.slice(0, 5).map((keyword) => (
                        <Detail.Metadata.TagList.Item key={keyword} text={keyword} color="#6B7280" />
                      ))}
                    </Detail.Metadata.TagList>
                  </>
                )}
              </Detail.Metadata>
            }
          />
        }
        actions={
          <ActionPanel>
            <ActionPanel.Section title="Main Actions">
              <Action.CopyToClipboard
                title="Copy Command"
                content={item.command}
                onCopy={() => increment(item)}
                icon={Icon.Clipboard}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
              <Action.CopyToClipboard
                title="Copy Description"
                content={item.description}
                icon={Icon.Text}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
              {item.example && (
                <Action.CopyToClipboard
                  title="Copy Example"
                  content={item.example}
                  onCopy={() => increment(item)}
                  icon={Icon.Document}
                  shortcut={{ modifiers: ["cmd", "opt"], key: "c" }}
                />
              )}
            </ActionPanel.Section>
            <ActionPanel.Section title="Usage Stats">
              <Action
                title="Mark as Used"
                icon={Icon.PlusCircle}
                shortcut={{ modifiers: ["cmd"], key: "u" }}
                onAction={() => markAsUsed(item)}
              />
              <Action.CopyToClipboard
                title="Export Cheat Sheet (Markdown)"
                content={cheatSheet}
                icon={Icon.Print}
                shortcut={{ modifiers: ["cmd", "shift"], key: "e" }}
              />
            </ActionPanel.Section>
            <ActionPanel.Section title="Additional">
              <Action.CopyToClipboard
                title="Copy All Information"
                content={`${item.command} - ${item.description}${item.example ? `\n\nExample: ${item.example}` : ""}${item.related && item.related.length > 0 ? `\n\nRelated Commands: ${item.related.join(", ")}` : ""}`}
                icon={Icon.Duplicate}
                onCopy={() => increment(item)}
              />
              {item.related && item.related.length > 0 && (
                <Action.CopyToClipboard
                  title="Copy Related Commands"
                  content={item.related.join(", ")}
                  icon={Icon.Link}
                />
              )}
            </ActionPanel.Section>
          </ActionPanel>
        }
      />
    );
  };

  return (
    <List
      isShowingDetail
      onSearchTextChange={setSearchText}
      filtering
      searchBarPlaceholder="Search Neovim command..."
      navigationTitle="Neovim Reference"
      searchBarAccessory={
        <List.Dropdown tooltip="Filter by categories" value={selectedCategory} onChange={setSelectedCategory}>
          <List.Dropdown.Item key="all" title="All Categories" value="all" icon="📋" />
          {uniqueCategories.map((category) => (
            <List.Dropdown.Item key={category} title={category} value={category} icon={getCategoryIcon(category)} />
          ))}
        </List.Dropdown>
      }
    >
      {frequentCommands.length > 0 && (
        <List.Section title="Frequently Used">{frequentCommands.map(renderItem)}</List.Section>
      )}
      <List.Section title={frequentCommands.length > 0 ? "All Commands" : undefined}>
        {otherCommands.map(renderItem)}
      </List.Section>
    </List>
  );
}
