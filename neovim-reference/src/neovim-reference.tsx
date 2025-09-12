import { List, ActionPanel, Action, Detail, Icon } from "@raycast/api";
import { useState } from "react";
import { nvimCommands, NeovimCommand } from "./commands";

// Функция для получения иконки в зависимости от режима
function getModeIcon(mode: string): string {
  switch (mode) {
    case "Normal":
      return "🟢";
    case "Insert":
      return "🔵";
    case "Visual":
      return "🟡";
    case "Command-line":
      return "🔴";
    default:
      return "⚪";
  }
}

// Функция для получения цвета режима
function getModeColor(mode: string): string {
  switch (mode) {
    case "Normal":
      return "#00FF00";
    case "Insert":
      return "#0080FF";
    case "Visual":
      return "#FFD700";
    case "Command-line":
      return "#FF4500";
    default:
      return "#808080";
  }
}

// Функция для получения иконки категории
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
    case "Miscellaneous":
      return "⚙️";
    default:
      return "📋";
  }
}

// Получаем уникальные категории
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
      searchBarPlaceholder="Искать команду Neovim..."
      navigationTitle="Neovim Reference"
      searchBarAccessory={
        <List.Dropdown
          tooltip="Фильтр по категориям"
          value={selectedCategory}
          onChange={setSelectedCategory}
        >
          <List.Dropdown.Item key="all" title="Все категории" value="all" icon="📋" />
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
          accessories={[
            { 
              text: item.mode,
              icon: getModeIcon(item.mode)
            }
          ]}
          keywords={[item.category, ...(item.keywords || [])]}
          detail={
            <List.Item.Detail
              markdown={`# ${item.command}

${item.description}

${item.example ? `## Пример использования\n\n${item.example}` : ""}

${item.related && item.related.length > 0 ? `## Связанные команды\n\n${item.related.map(cmd => `\`${cmd}\``).join(" • ")}` : ""}`}
              metadata={
                <Detail.Metadata>
                  <Detail.Metadata.Label 
                    title="Команда" 
                    text={item.command} 
                    icon="💻"
                  />
                  <Detail.Metadata.Separator />
                  <Detail.Metadata.TagList title="Режим">
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
              <ActionPanel.Section title="Основные действия">
                <Action.CopyToClipboard
                  title="Скопировать команду"
                  content={item.command}
                  icon={Icon.Clipboard}
                  shortcut={{ modifiers: ["cmd"], key: "c" }}
                />
                <Action.CopyToClipboard
                  title="Скопировать описание"
                  content={item.description}
                  icon={Icon.Text}
                  shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
                />
                {item.example && (
                  <Action.CopyToClipboard
                    title="Скопировать пример"
                    content={item.example}
                    icon={Icon.Document}
                    shortcut={{ modifiers: ["cmd", "opt"], key: "c" }}
                  />
                )}
              </ActionPanel.Section>
              <ActionPanel.Section title="Дополнительно">
                <Action.CopyToClipboard
                  title="Скопировать всю информацию"
                  content={`${item.command} - ${item.description}${item.example ? `\n\nПример: ${item.example}` : ""}${item.related && item.related.length > 0 ? `\n\nСвязанные команды: ${item.related.join(", ")}` : ""}`}
                  icon={Icon.Duplicate}
                />
                {item.related && item.related.length > 0 && (
                  <Action.CopyToClipboard
                    title="Скопировать связанные команды"
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