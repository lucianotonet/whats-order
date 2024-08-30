<template>
    <div class="mx-auto px-2 md:px-24 w-full py-6 md:py-12 flex">
        <div class="max-w-3xl mx-auto w-2/3">

            <div class="flex justify-between items-center mb-12">
                <h1 class="text-2xl font-black">SOLICITAÇÃO DE OFERTA 🎯 <small>v3.0</small></h1>
            </div>

            <form @submit.prevent="sendOrder" class="grid gap-8">
                <fieldset class="fieldset border p-4">
                    <div class="flex gap-2 flex-row items-end">
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="rca">RCA</label>
                            <input required v-model="rca"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="text" name="rca"
                                id="rca">
                        </div>
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="precoAutorizado">Preço Autorizado</label>
                            <input required v-model="precoAutorizado"
                                class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200"
                                type="text" name="precoAutorizado" id="precoAutorizado" readonly>
                        </div>
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="descontoPercentual">Desconto (%)</label>
                            <input required v-model="descontoPercentual"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                                name="descontoPercentual" id="descontoPercentual">
                        </div>
                    </div>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend>Produto</legend>

                    <div class="flex gap-2 flex-row items-center">
                        <div class="flex flex-col mb-4 w-1/6">
                            <label class="text-xs uppercase opacity-75" for="codigoProduto">Código</label>
                            <input required v-model="produto.codigo"
                                class="rounded shadow-inner border border-black px-2 py-1" type="text"
                                @input="() => handleProdutoInput(produto.codigo)" list="produtoList">
                            <datalist id="produtoList">
                                <option v-for="item in produtos" :key="item.codigo" :value="item.codigo" />
                            </datalist>
                        </div>
                        <div class="flex flex-col mb-4 w-full flex-grow flex-1">
                            <label class="text-xs uppercase opacity-75" for="descricaoProduto">Descrição</label>
                            <input required v-model="produto.descricao"
                                class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200"
                                type="text" readonly>
                        </div>
                        <div class="flex flex-col mb-4 w-1/6">
                            <label class="text-xs uppercase opacity-75" for="precoTotalProduto">Preço</label>
                            <input required v-model="produto.precoTotal"
                                class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200"
                                type="text" readonly>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-row items-center">
                        <div class="flex flex-col mb-4 w-full">
                            <label class="text-xs uppercase opacity-75" for="codigoProdutoExtras">Códigos extras</label>
                            <CodesInput class="w-full border border-black" :data="produtos"
                                @update:modelValue="updateProdutosExtras" />
                        </div>
                    </div>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend>Cliente</legend>

                    <div class="flex gap-2 flex-row items-center mb-4">
                        <div class="flex flex-col w-1/6">
                            <label class="text-xs uppercase opacity-75" for="codigoCliente">Código</label>
                            <input required v-model="cliente.codigo"
                                class="rounded shadow-inner border border-black px-2 py-1" type="text"
                                @input="() => handleClienteInput(cliente.codigo)" list="clienteList">
                            <datalist id="clienteList">
                                <option v-for="cliente in clientes" :key="cliente.codigo" :value="cliente.codigo" />
                            </datalist>
                        </div>
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="razaoSocialCliente">Razão Social</label>
                            <input required v-model="cliente.razaoSocial"
                                class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200"
                                type="text" readonly>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-row items-center">
                        <div class="flex flex-col mb-4 w-full">
                            <label class="text-xs uppercase opacity-75" for="codigoClienteExtras">Códigos extras</label>
                            <CodesInput class="w-full border border-black" :data="clientes"
                                @update:modelValue="updateClientesExtras" />
                        </div>
                    </div>
                </fieldset>

                <div class="flex flex-col gap-2 md:flex-row">
                    <div class="flex flex-col w-full md:w-1/3">
                        <label class="text-xs uppercase opacity-75" for="quantidade">Quantidade</label>
                        <input required v-model="quantidade"
                            class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                            name="quantidade" id="quantidade">
                    </div>
                    <div class="flex flex-col w-full md:w-1/3">
                        <label class="text-xs uppercase opacity-75" for="precoTablet">Preço Tablet</label>
                        <input required v-model="precoTablet"
                            class="w-full rounded shadow-inner border border-black px-2 py-1 bg-gray-200" type="text"
                            name="precoTablet" id="precoTablet" readonly>
                    </div>
                    <div class="flex flex-col w-full md:w-1/3">
                        <label class="text-xs uppercase opacity-75" for="flexRca">FLEX/RCA</label>
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
        <div class="w-1/3 p-4 border-l">
            <h2 class="text-lg font-bold mb-4">Pré-visualização</h2>
            <div class="bg-white shadow-md rounded-lg p-4 mb-4">
                <div class="flex items-start">
                    <div class="min-w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                    <div class="flex flex-col">
                        <span class="font-bold text-sm">Você</span>
                        <div class="bg-green-100 text-gray-800 p-2 rounded-lg" v-html="previewMessage"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CodesInput from '~/components/CodesInput.vue';
import { useMainStore } from '~/stores/main';

const store = useMainStore();

const rca = ref(null);
const precoAutorizado = ref(null);
const descontoPercentual = ref(null);
const produto = ref({ codigo: '', descricao: '', precoTotal: '' });
const produtosExtras = ref([]);
const cliente = ref({ codigo: '', razaoSocial: '' });
const clientesExtras = ref([]);
const quantidade = ref(null);
const precoTablet = ref(null);
const flexRca = ref(null);
const produtos = ref([]);
const clientes = ref([]);

const fetchProdutos = async () => {
    const response = await fetch('/produtos.json');
    if (response.ok) {
        const allProdutos = await response.json();
        produtos.value = allProdutos;
    } else {
        console.warn('Arquivo de produtos não encontrado.');
    }
}

const fetchClientes = async () => {
    const response = await fetch('/clientes.json');
    if (response.ok) {
        const allClientes = await response.json();
        clientes.value = allClientes;
    } else {
        console.warn('Arquivo de clientes não encontrado.');
    }
}

const getProduto = async (term) => {
    if (term.length < 1) return;

    return produtos.value.filter(produto => produto.descricao.toLowerCase().includes(term.toLowerCase()));
};

const getCliente = async (term) => {
    if (term.length < 1) return;

    return clientes.value.filter(cliente => cliente.razaoSocial.toLowerCase().includes(term.toLowerCase()));
};

onMounted(async () => {
    await fetchProdutos();
    await fetchClientes();
});

const updateDescricaoProduto = () => {
    const produtoEncontrado = produtos.value.find(p => p.codigo.toString() === produto.value.codigo);
    if (produtoEncontrado) {
        produto.value.descricao = produtoEncontrado.descricao;
        produto.value.precoTotal = produtoEncontrado.precoTotal;
    } else {
        produto.value.descricao = '';
        produto.value.precoTotal = '';
    }
};
const updateDescricaoCliente = () => {
    const clienteEncontrado = clientes.value.find(p => p.codigo.toString() === cliente.value.codigo);
    if (clienteEncontrado) {
        cliente.value.razaoSocial = clienteEncontrado.razaoSocial;
    } else {
        cliente.value.razaoSocial = '';
    }
};

const handleClienteInput = async (codigo) => {
    cliente.value.codigo = codigo;
    await getCliente(codigo);
    updateDescricaoCliente();
};

const handleProdutoInput = async (codigo) => {
    produto.value.codigo = codigo;
    await getProduto(codigo);
    updateDescricaoProduto();
};

const updateProdutosExtras = (novosCodigos) => {
    produtosExtras.value = novosCodigos;
};

const updateClientesExtras = (novosCodigos) => {
    clientesExtras.value = novosCodigos;
};

const whatsAppMessage = computed(() => {
    const produtosList = [produto.value.codigo, ...produtosExtras.value].join(' / ');
    const clientesList = [cliente.value.codigo, ...clientesExtras.value].join(' / ');
    let message = `*SOLICITAÇÃO DE OFERTA 🎯*\n\n` +
        `● *RCA*:  ${rca.value ?? '-'}\n` +
        `● *Preço Autorizado*:  ${precoAutorizado.value ?? '-'}\n` +
        `● *Desconto*:  ${descontoPercentual.value ?? '-'}\n` +
        `● *Descrição produto*: ${produto.value.descricao ?? '-'}\n` + // Adicionando a descrição do produto
        `● *Código produto*: ${produtosList}\n` +
        `● *Razão Social cliente*: ${cliente.value.razaoSocial ?? '-'}\n` +
        `● *Código cliente*: ${clientesList}\n` +
        `● *Quantidade*:  ${quantidade.value ?? '-'}\n` +
        `● *Preço Tablet*:  ${precoTablet.value ?? '-'}\n` +
        `● *FLEX/RCA*:  ${flexRca.value ?? '-'}`;

    return message;
});

const previewMessage = computed(() => {
    const produtosList = [produto.value.codigo, ...produtosExtras.value].join(' / ');
    const clientesList = [cliente.value.codigo, ...clientesExtras.value].join(' / ');
    let message = `<strong>SOLICITAÇÃO DE OFERTA 🎯</strong><br><br>` +
        `● <strong>RCA</strong>:                ${rca.value ?? '-'}<br>` +
        `● <strong>Preço Autorizado</strong>:   ${precoAutorizado.value ?? '-'}<br>` +
        `● <strong>Desconto</strong>:           ${descontoPercentual.value ?? '-'}<br>` +
        `● <strong>Descrição produto</strong>:  ${produto.value.descricao ?? '-'}<br>` + // Adicionando a descrição do produto
        `● <strong>Código produto</strong>:     ${produtosList}<br>` +
        `● <strong>Razão Social cliente</strong>: ${cliente.value.razaoSocial ?? '-'}<br>` +
        `● <strong>Código cliente</strong>:     ${clientesList}<br>` +
        `● <strong>Quantidade</strong>:         ${quantidade.value ?? '-'}<br>` +
        `● <strong>Preço Tablet</strong>:       ${precoTablet.value ?? '-'}<br>` +
        `● <strong>FLEX/RCA</strong>:           ${flexRca.value ?? '-'}`;

    return message;
});

const isValid = computed(() => {
    return !!rca.value &&
        !!precoAutorizado.value &&
        !!descontoPercentual.value &&
        !!produto.value.codigo &&
        !!quantidade.value &&
        !!precoTablet.value &&
        !!flexRca.value;
});

const sendOrder = () => {
    if (isValid.value) {
        const link = `https://api.whatsapp.com/send?phone=5554996132844&text=${encodeURIComponent(whatsAppMessage.value)}`;
        window.open(link, '_new');
    } else {
        alert('Preencha todos os campos');
    }
};
</script>

<style>
input {
    font-family: monospace;
    font-size: 16px;
}
</style>
