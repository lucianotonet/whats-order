<template>
  <footer class="text-center text-xs text-gray-500 py-2">
    <p>Versão: {{ version }}</p>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const version = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/api/version.json');
    const data = await response.json();
    version.value = data.version;
  } catch (error) {
    console.error('Erro ao carregar a versão:', error);
    version.value = 'Desconhecida';
  }
});
</script>