#!/bin/bash

# Configurações
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="temp_changelog.md"
REPO_OWNER="lucianotonet"
REPO_NAME="whats-order"
GITHUB_API="https://api.github.com"

# Verifica se o curl está instalado
if ! command -v curl &> /dev/null; then
    echo "Error: curl não está instalado."
    exit 1
fi

# Verifica se há permissão de escrita
if [ ! -w "$CHANGELOG_FILE" ]; then
    echo "Error: Permissão negada para escrever no $CHANGELOG_FILE."
    exit 1
fi

# Inicializa o arquivo temporário do Changelog
echo "# Changelog" > "$TEMP_FILE"

# Função para obter commits do GitHub
get_commits() {
    curl -s "${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/commits" | \
    jq -r '.[] | "
_[" + (.commit.author.date | split("T")[0] | split("-") | reverse | join("/")) + "](https://github.com/'${REPO_OWNER}'/'${REPO_NAME}'/commits/" + .sha + ")_
### " + .commit.message + "
"'
}

# Gera o changelog baseado nos commits do GitHub
get_commits >> "$TEMP_FILE"

# Atualiza o arquivo Changelog com o temporário
if mv "$TEMP_FILE" "$CHANGELOG_FILE"; then
    if ! cp "$CHANGELOG_FILE" "./public/$CHANGELOG_FILE"; then
        echo "Error: Falha ao copiar $CHANGELOG_FILE para /public/."
        exit 1
    fi
else
    echo "Error: Falha ao mover $TEMP_FILE para $CHANGELOG_FILE."
    exit 1
fi

echo "Changelog atualizado com sucesso!"
