<template>
    <div class="mx-auto px-12 md:px-24 w-full py-6 md:py-12">
        <div class="max-w-2xl mx-auto">

            <div class="flex justify-between items-center mb-12">
                <h1 class="text-2xl font-black">SOLICITAÇÃO DE OFERTA 🎯 <small>v3.0</small></h1>
            </div>

            <form @submit.prevent="sendOrder" class="grid gap-y-4">
                <div class="flex flex-col gap-4 md:flex-row">
                    <div class="flex flex-col w-full">
                        <label for="rca">RCA</label>
                        <input required v-model="rca" class="w-full rounded shadow-inner border border-black px-2 py-1"
                            type="text" name="rca" id="rca">
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="precoAutorizado">Preço Autorizado</label>
                        <input required v-model="precoAutorizado"
                            class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                            name="precoAutorizado" id="precoAutorizado">
                    </div>
                </div>

                <div class="flex flex-col gap-4 md:flex-row">
                    <div class="flex flex-col w-full md:w-1/3">
                        <label for="codigoProduto">Código do Produto</label>
                        <input required v-model="codigoProduto"
                            class="rounded shadow-inner border border-black px-2 py-1" type="text" name="codigoProduto"
                            id="codigoProduto" @input="handleProdutoInput; updateDescricaoProduto()" list="produtoList">
                        <datalist id="produtoList">
                            <option v-for="produto in produtos" :key="produto.codigo" :value="produto.codigo" />
                        </datalist>
                    </div>
                    <div class="flex flex-col w-full md:w-2/3">
                        <label for="descricaoProduto">Descrição do Produto</label>
                        <input required v-model="descricaoProduto"
                            class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200" type="text"
                            name="descricaoProduto" id="descricaoProduto" readonly>
                    </div>
                </div>

                <div class="flex flex-col gap-4 md:flex-row">
                    <div class="flex flex-col w-full md:w-1/3">
                        <label for="codigoCliente">Código do Cliente</label>
                        <input required v-model="codigoCliente"
                            class="rounded shadow-inner border border-black px-2 py-1" type="text" name="codigoCliente"
                            id="codigoCliente" @input="handleClienteInput; updateRazaoSocialCliente()"
                            list="clienteList">
                        <datalist id="clienteList">
                            <option v-for="cliente in clientes" :key="cliente.codigo" :value="cliente.codigo" />
                        </datalist>
                    </div>
                    <div class="flex flex-col w-full md:w-2/3">
                        <label for="razaoSocialCliente">Razão Social do Cliente</label>
                        <input required v-model="razaoSocialCliente"
                            class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200" type="text"
                            name="razaoSocialCliente" id="razaoSocialCliente" readonly>
                    </div>
                </div>

                <div class="flex flex-col gap-4 md:flex-row">
                    <div class="flex flex-col w-full md:w-1/3">
                        <label for="quantidade">Quantidade</label>
                        <input required v-model="quantidade"
                            class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                            name="quantidade" id="quantidade">
                    </div>
                    <div class="flex flex-col w-full md:w-1/3">
                        <label for="precoTablet">Preço Tablet</label>
                        <input required v-model="precoTablet"
                            class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                            name="precoTablet" id="precoTablet">
                    </div>
                    <div class="flex flex-col w-full md:w-1/3">
                        <label for="flexRca">FLEX/RCA</label>
                        <input required v-model="flexRca"
                            class="w-full rounded shadow-inner border border-black px-2 py-1" type="text" name="flexRca"
                            id="flexRca">
                    </div>
                </div>

                <button type="submit"
                    :class="{ 'opacity-20 disabled cursor-not-allowed': !isValid, 'opacity-100': !!isValid }"
                    class="w-full bg-black text-white py-2 px-3 rounded shadow mt-6">Enviar</button>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMainStore } from '~/stores/main';

const store = useMainStore();

const rca = ref(null);
const precoAutorizado = ref(null);
const descricaoProduto = ref(null);
const codigoProduto = ref(null);
const razaoSocialCliente = ref(null);
const codigoCliente = ref(null);
const quantidade = ref(null);
const precoTablet = ref(null);
const flexRca = ref(null);
const produtos = ref([]);
const clientes = ref([]);
const searchTermProduto = ref('');
const searchTermCliente = ref('');

const loadProdutos = async (term) => {
    const response = await fetch('/produtos.json');
    const allProdutos = await response.json();
    produtos.value = allProdutos.filter(produto => produto.descricao.toLowerCase().includes(term.toLowerCase()));
};

const loadClientes = async (term) => {
    const response = await fetch('/clientes.json');
    const allClientes = await response.json();
    clientes.value = allClientes.filter(cliente => cliente.razaoSocial.toLowerCase().includes(term.toLowerCase()));
};

onMounted(async () => {
    await loadClientes('');
    await loadProdutos('');
});

const updateDescricaoProduto = () => {
    const produto = produtos.value.find(p => p.codigo.toString() === codigoProduto.value);
    descricaoProduto.value = produto ? produto.descricao : '';
};

const updateRazaoSocialCliente = () => {
    const cliente = clientes.value.find(c => c.codigo.toString() === codigoCliente.value);
    razaoSocialCliente.value = cliente ? cliente.razaoSocial : '';
};

const handleProdutoInput = () => {
    if (searchTermProduto.value.length > 2) {
        loadProdutos(searchTermProduto.value);
    }
};

const handleClienteInput = () => {
    if (searchTermCliente.value.length > 2) {
        loadClientes(searchTermCliente.value);
    }
};

const whatsAppLink = computed(() => {
    let br = "%0A";

    let message = `*SOLICITAÇÃO DE OFERTA* ${br}
${br}● *RCA*:  ${rca.value ?? '-'}
${br}● *Preço Autorizado*:  ${precoAutorizado.value ?? '-'}
${br}● *Código produto*:  ${codigoProduto.value ?? '-'}
${br}● *Descrição produto*:  ${descricaoProduto.value ?? '-'}
${br}● *Código do cliente*:  ${codigoCliente.value ?? '-'}
${br}● *Razão Social cliente*:  ${razaoSocialCliente.value ?? '-'}
${br}● *Quantidade*:  ${quantidade.value ?? '-'}
${br}● *Preço Tablet*:  ${precoTablet.value ?? '-'}
${br}● *FLEX/RCA*:  ${flexRca.value ?? '-'}`;

    // return `https://api.whatsapp.com/send?phone=5554999256258&text=${message}%0A`;
    return `https://api.whatsapp.com/send?phone=5554996132844&text=${message}`;
});

const isValid = computed(() => {
    return !!rca.value &&
        !!precoAutorizado.value &&
        !!descricaoProduto.value &&
        !!codigoProduto.value &&
        !!razaoSocialCliente.value &&
        !!codigoCliente.value &&
        !!quantidade.value &&
        !!precoTablet.value &&
        !!flexRca.value;
});

const sendOrder = () => {
    if (isValid.value) {
        window.open(whatsAppLink.value, '_new');
    } else {
        alert('Preencha todos os campos');
    }
};
</script>
