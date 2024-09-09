<template>
    <div class="mx-auto max-w-3xl px-8 md:px-16 w-full py-8 md:py-16 bg-white shadow-lg rounded-lg">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-extrabold text-gray-800">Configurações</h2>
            <NuxtLink to="/"
                class="flex gap-2 items-center text-white bg-black py-2 uppercase text-xs px-4 rounded-sm shadow-sm transition duration-300 ease-in-out transform hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                Solicitação de oferta
            </NuxtLink>
        </div>
        <p v-if="message" :class="{ 'text-green-600 bg-green-400/5': success, 'text-red-600 bg-red-400/5': !success }"
            class="text-center mb-4 text-md p-4 rounded-md" v-html="message"></p>
        <div v-if="loadingConversion"
            class="loader items-center flex justify-center flex-row gap-2 text-center mb-4 text-md p-4 bg-orange-400/5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 animate animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Convertendo...
        </div>
        <div v-if="loadingUpload"
            class="loader items-center flex justify-center flex-row gap-2 text-center mb-4 text-md p-4 bg-orange-400/5 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4 animate animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Enviando...
        </div>
        <!-- Informações rápidas -->
        <div class="bg-gray-100 p-4 rounded-lg mb-8 flex flex-col gap-2">
            <h2 class="text-xl font-bold mb-2">Informações do Sistema</h2>
            <p class="text-gray-700 w-full flex">
                Total de Clientes:
                <span v-if="store.loadingClientes" class="ml-2 text-blue-500">Carregando...</span>
                <span v-else class="ml-2 font-semibold">{{ store.totalClientes || 0 }}</span>
                <button @click="deleteClientes" class="ml-auto cursor-pointer text-red-500">Excluir</button>
            </p>
            <p class="text-gray-700 w-full flex">
                Total de Produtos:
                <span v-if="store.loadingProdutos" class="ml-2 text-blue-500">Carregando...</span>
                <span v-else class="ml-2 font-semibold">{{ store.totalProdutos || 0 }}</span>
                <button @click="deleteProdutos" class="ml-auto cursor-pointer text-red-500">Excluir</button>
            </p>
        </div>

        <div class="mt-8">
            <div class="mb-8 flex flex-col gap-4">
                <div class="flex flex-row items-end gap-2">
                    <label class="block text-lg font-medium text-gray-700">
                        Upload de Clientes:
                        <input @change="handleFileChange($event, 'clientes')" type="file" accept=".xlsx,.xls"
                            class="mt-1 border border-gray-300 rounded-md p-1.5 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref="clientesInputFile" />
                    </label>
                    <button @click="() => handleFileUpload('clientes')" :disabled="!clientesInputFile?.value || loadingUpload"
                        class="cursor-pointer border items-center py-2 px-4 rounded-md shadow h-12 bg-black text-white flex gap-2 ">
                        Enviar
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-row items-end gap-2">
                    <label class="block text-lg font-medium text-gray-700">
                        Upload de Produtos:
                        <input @change="handleFileChange($event, 'produtos')" type="file" accept=".xlsx,.xls"
                            class="mt-1 border border-gray-300 rounded-md p-1.5 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ref="produtosInputFile" />
                    </label>
                    <button @click="() => handleFileUpload('produtos')" :disabled="!produtosInputFile?.value || loadingUpload"
                        class="cursor-pointer border items-center py-2 px-4 rounded-md shadow h-12 bg-black text-white flex gap-2 ">
                        Enviar
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMainStore } from '~/stores/main';
import * as XLSX from 'xlsx';

const message = ref('');
const success = ref(false);
const loadingConversion = ref(false);
const loadingUpload = ref(false);
const store = useMainStore();
const clientesInputFile = ref(null);
const produtosInputFile = ref(null);

onMounted(async () => {
    await store.loadClientes();
    await store.loadProdutos();
});

const handleFileChange = (event, type) => {
    if (type === 'clientes') {
        clientesInputFile.value = event.target.files[0];
    } else if (type === 'produtos') {
        produtosInputFile.value = event.target.files[0];
    }
};

const handleFileUpload = async (type) => {
    let file;
    if (type === 'clientes') {
        file = clientesInputFile.value;
    } else if (type === 'produtos') {
        file = produtosInputFile.value;
    }

    file = file.files[0]
    if (!file) return;

    loadingConversion.value = true;

    let previousData = type === 'clientes' ? [...store.clientes] : [...store.produtos];
    let processedData = [];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '' });

    if (type === 'clientes') {
        processedData = sheetData.map(row => ({
            codigo: row[0],
            razaoSocial: row[1]
        }));
        store.setClientes(processedData);
    } else if (type === 'produtos') {
        processedData = sheetData.map(row => ({
            codigo: row[0],
            descricao: row[1],
            fracionamento: row[2],
            precoUnitario: parseFloat(row[3]) || 0,
            precoCx: parseFloat(row[4]) || 0,
            precoTotal: parseFloat(row[5]) || 0
        }));
        store.setProdutos(processedData);
    }

    loadingConversion.value = false;
    loadingUpload.value = true;

    const totalItems = processedData.length;
    message.value = `Dados de ${type} processados com sucesso.<br/>Total de ${type}: ${totalItems}.`;
    success.value = true;
    loadingUpload.value = false;

    // Limpar os inputs após o upload
    clientesInputFile.value = null;
    produtosInputFile.value = null;
};

const deleteClientes = async () => {
    await store.deleteData('clientes');
    message.value = 'Clientes excluídos com sucesso.';
    success.value = true;
};

const deleteProdutos = async () => {
    await store.deleteData('produtos');
    message.value = 'Produtos excluídos com sucesso.';
    success.value = true;
};
</script>