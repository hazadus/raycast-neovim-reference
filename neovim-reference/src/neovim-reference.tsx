import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api";
import { useState } from "react";
import { nvimCommands } from "./commands";
import type { NeovimCommand } from "./types";

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

const uniqueCategories = Array.from(new Set(nvimCommands.map(cmd => cmd.category)));

export default function Command() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Фильтруем команды по выбранной категории
  const filteredCommands = selectedCategory === "all" 
    ? nvimCommands 
    : nvimCommands.filter(cmd => cmd.category === selectedCategory);

  return (
    <List 
      isShowingDetail 
      searchBarPlaceholder="Search Neovim command..."
      navigationTitle="Neovim Reference"
      searchBarAccessory={
        <List.Dropdown
          tooltip="Filter by categories"
          value={selectedCategory}
          onChange={setSelectedCategory}
        >
          <List.Dropdown.Item key="all" title="All Categories" value="all" icon="📋" />
          {uniqueCategories.map((category) => (
            <List.Dropdown.Item 
              key={category} 
              title={category} 
              value={category}
              icon={getCategoryIcon(category)}
            />
          ))}
        </List.Dropdown>
      }
    >
      {filteredCommands.map((item: NeovimCommand) => (
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

${item.related && item.related.length > 0 ? `## Related Commands\n\n${item.related.map(cmd => `\`${cmd}\``).join(" • ")}` : ""}`}
              metadata={
                <Detail.Metadata>
                  <Detail.Metadata.Label 
                    title="Command" 
                    text={item.command} 
                    icon="💻"
                  />
                  <Detail.Metadata.Separator />
                  <Detail.Metadata.TagList title="Mode">
                    <Detail.Metadata.TagList.Item 
                      text={item.mode} 
                      color={getModeColor(item.mode)}
                      icon={getModeIcon(item.mode)}
                    />
                  </Detail.Metadata.TagList>
                  <Detail.Metadata.Separator />
                  <Detail.Metadata.Label 
                    title="Категория" 
                    text={item.category} 
                    icon={getCategoryIcon(item.category)}
                  />
                  {item.keywords && item.keywords.length > 0 && (
                    <>
                      <Detail.Metadata.Separator />
                      <Detail.Metadata.TagList title="Теги">
                        {item.keywords.slice(0, 5).map((keyword) => (
                          <Detail.Metadata.TagList.Item 
                            key={keyword} 
                            text={keyword}
                            color="#6B7280"
                          />
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
                    icon={Icon.Document}
                    shortcut={{ modifiers: ["cmd", "opt"], key: "c" }}
                  />
                )}
              </ActionPanel.Section>
              <ActionPanel.Section title="Additional">
                <Action.CopyToClipboard
                  title="Copy All Information"
                  content={`${item.command} - ${item.description}${item.example ? `\n\nExample: ${item.example}` : ""}${item.related && item.related.length > 0 ? `\n\nRelated Commands: ${item.related.join(", ")}` : ""}`}
                  icon={Icon.Duplicate}
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
      ))}
    </List>
  );
}