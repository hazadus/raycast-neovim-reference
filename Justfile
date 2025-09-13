# Собрать расширение
build:
    cd ./neovim-reference && npm run build

# Сгенерировать сообщение коммита (см. https://github.com/hazadus/gh-commitmsg)
commitmsg:
    gh commitmsg --language russian --examples
