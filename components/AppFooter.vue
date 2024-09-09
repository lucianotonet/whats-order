<template>
  <footer class="text-center text-xs text-gray-500 pb-2 pt-6 mt-auto">
    <small>
      Versão: {{ version }} | 
      <NuxtLink to="/changelog" class="underline hover:text-gray-700">Ver Changelog</NuxtLink>
    </small>
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