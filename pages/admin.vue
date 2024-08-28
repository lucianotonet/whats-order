<template>
    <div
        class="mx-auto max-w-3xl px-8 md:px-16 w-full py-8 md:py-16 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 class="text-4xl font-extrabold mb-6 text-center text-blue-700">Painel de Administração</h2>
        <p v-if="message" :class="{ 'text-green-600': success, 'text-red-600': !success }"
            class="text-center mb-4 text-lg">{{ message }}</p>
        <!-- Informações rápidas -->
        <div class="bg-gray-100 p-4 rounded-lg mb-8">
            <h2 class="text-xl font-bold mb-2">Informações do Sistema</h2>
            <p>Total de Clientes: {{ store.totalClientes || 0 }}</p>
            <p>Total de Produtos: {{ store.totalProdutos || 0 }}</p>
        </div>

        <div class="mt-8">
            <div class="mb-8">
                <label class="block mb-2 text-lg font-medium text-gray-700">
                    Upload de Clientes:
                    <input type="file" @change="(e) => handleFileUpload(e, 'clientes')" accept=".xlsx,.xls"
                        class="mt-1 border border-gray-300 rounded-md p-3 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </label>
                <div v-if="loadingClientes" class="loader text-center">Carregando...</div>
            </div>
            <div class="mb-8">
                <label class="block mb-2 text-lg font-medium text-gray-700">
                    Upload de Produtos:
                    <input type="file" @change="(e) => handleFileUpload(e, 'produtos')" accept=".xlsx,.xls"
                        class="mt-1 border border-gray-300 rounded-md p-3 w-full transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </label>
                <div v-if="loadingProdutos" class="loader text-center">Carregando...</div>
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
const loadingClientes = ref(false);
const loadingProdutos = ref(false);
const store = useMainStore();
const clientes = ref([]);
const produtos = ref([]);

onMounted(async () => {
    await store.loadClientes();
    await store.loadProdutos();
});

const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    let previousData = type === 'clientes' ? [...clientes.value] : [...produtos.value];
    let processedData = [];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '' });

    if (type === 'clientes') {
        loadingClientes.value = true;
        processedData = sheetData.map(row => ({
            codigo: row[0],
            razaoSocial: row[1]
        }));
        store.setClientes(processedData);
        clientes.value = processedData;
        loadingClientes.value = false;
    } else if (type === 'produtos') {
        loadingProdutos.value = true;
        processedData = sheetData.map(row => ({
            codigo: row[0],
            descricao: row[1],
            fracionamento: row[2],
            precoUnitario: parseFloat(row[3]) || 0,
            precoCx: parseFloat(row[4]) || 0,
            precoTotal: parseFloat(row[5]) || 0
        }));
        store.setProdutos(processedData);
        produtos.value = processedData;
        loadingProdutos.value = false;
    }

    const newData = type === 'clientes' ? clientes.value : produtos.value;
    const addedItems = processedData.length - previousData.length;
    const totalItems = processedData.length;

    message.value = `Dados de ${type} processados com sucesso. Itens adicionados: ${addedItems}. Total de ${type}: ${totalItems}.`;
    success.value = true;
};
</script>
