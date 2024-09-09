<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Changelog</h1>
    <div v-html="changelogContent" class="prose prose-sm max-w-none"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

const changelogContent = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/CHANGELOG.md');
    const markdown = await response.text();
    changelogContent.value = marked(markdown);
  } catch (error) {
    console.error('Erro ao carregar o changelog:', error);
    changelogContent.value = '<p>Erro ao carregar o changelog.</p>';
  }
});
</script>