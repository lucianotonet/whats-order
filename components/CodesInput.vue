<script setup>
import { computed, ref, watch } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input'

const modelValue = ref([])
const open = ref(false)
const searchTerm = ref('')

// Recebendo o datalist de @index.vue
const props = defineProps(['data']);
const filteredData = computed(() => {
  // Exibir apenas os primeiros 10 items que não estão selecionados
  return props.data.filter(item => !!searchTerm.value.includes(item.codigo)).slice(0, 10);
});

// Enviar o modelValue via evento quando atualizado
watch(modelValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<template>
  <TagsInput class="px-0 gap-0 w-80" :model-value="modelValue">
    <div class="flex gap-2 flex-wrap items-center px-3">
      <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
        <TagsInputItemText />
        <TagsInputItemDelete />
      </TagsInputItem>
    </div>

    <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:searchTerm="searchTerm" class="w-full">
      <ComboboxAnchor as-child>
        <ComboboxInput placeholder="Digite os códigos separados por vírgula ..." as-child>
          <TagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" @keydown.enter.prevent />
        </ComboboxInput>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent>
          <CommandList position="popper"
            class="w-[--radix-popper-anchor-width] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <CommandEmpty />
            <CommandGroup>
              <CommandItem v-for="item in filteredData" :key="item.codigo" :value="item.codigo" @select.prevent="(ev) => {
                  const selectedValue = ev.detail.value;
                  if (selectedValue) {
                    modelValue.push(selectedValue.toString()); // Adiciona o valor selecionado
                  }
                }">{{ item.codigo }} - {{ item.descricao || item.razaoSocial }}</CommandItem>
            </CommandGroup>
          </CommandList>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </TagsInput>
</template>