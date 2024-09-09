#!/bin/bash

# Configurações
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="temp_changelog.md"

# Verifica se o Git está instalado
if ! command -v git &> /dev/null; then
    echo "Error: Git não está instalado."
    exit 1
fi

# Verifica se há permissão de escrita
if [ ! -w "$CHANGELOG_FILE" ]; then
    echo "Error: Permissão negada para escrever no $CHANGELOG_FILE."
    exit 1
fi

# Inicializa o arquivo temporário do Changelog
echo "# Changelog" > "$TEMP_FILE"

# Gera o changelog baseado nos commits do histórico no GitHub
git log --pretty=format:"
_[%ad](https://github.com/lucianotonet/whats-order/commits/%H)_
### %s

%b
" --date=format:"%d/%m/%Y %H:%M" HEAD >> "$TEMP_FILE"

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
