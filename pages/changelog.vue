<template>
  <div class="container max-w-3xl mx-auto px-4 py-8">
    <div v-html="formattedChangelogContent" class="prose prose-sm max-w-none"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const changelogContent = ref('');
const formattedChangelogContent = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/CHANGELOG.md');
    const markdown = await response.text();
    const sections = markdown.split('---'); // Divide o conteúdo em seções
    formattedChangelogContent.value = sections.map(section => {
      const paragraphs = section.split('. ').map(paragraph => paragraph.trim()).filter(paragraph => paragraph); // Divide em parágrafos
      return marked(paragraphs.join('.<br>')); // Converte cada parágrafo e junta com nova linha
    }).join('<br>'); // Converte cada seção e junta
  } catch (error) {
    console.error('Erro ao carregar o changelog:', error);
    formattedChangelogContent.value = '<p>Erro ao carregar o changelog.</p>';
  }
});
</script>
