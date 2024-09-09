#!/bin/bash

# Settings
DATE_FORMAT="%d/%m/%Y %H:%M"
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="temp_changelog.md"
JSON_FILE="temp_changelog.json"

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git não está instalado."
    exit 1
fi

# Check if write permission is available
if [ ! -w "$CHANGELOG_FILE" ]; then
    echo "Error: Permissão negada para escrever no $CHANGELOG_FILE."
    exit 1
fi

# Initialize the temporary Changelog file
echo "# Changelog" > "$TEMP_FILE"

# Include all commits in the repository with refined formatting
git log --pretty=format:"
_[%ad](%H)_
### %s

%b

---
" --date=format:"%d/%m/%Y %H:%M" HEAD >> "$TEMP_FILE"

# Replace the Changelog file with the temporary one
mv "$TEMP_FILE" "$CHANGELOG_FILE"

echo "Changelog atualizado com sucesso!"
