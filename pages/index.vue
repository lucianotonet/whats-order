<template>
    <div class="mx-auto px-2 md:px-24 w-full py-6 md:py-12 flex">
        <div class="max-w-5xl mx-auto w-2/3">

            <div class="flex justify-between items-center mb-12">
                <h1 class="text-2xl font-black">SOLICITAÇÃO DE OFERTA 🎯 <small>v3.0</small></h1>
            </div>

            <form @submit.prevent="sendOrder" class="grid gap-8">
                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Vendedor</legend>
                    <div class="flex gap-1.5 flex-row items-end">
                        <div class="flex flex-col w-2/3">
                            <label class="text-xs uppercase opacity-75" for="rca">RCA</label>
                            <input required v-model="rca"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="text" name="rca"
                                id="rca">
                        </div>
                        <div class="flex flex-col w-1/3">
                            <label class="text-xs uppercase opacity-75" for="flexRca">FLEX/RCA</label>
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200" id="flexRca">{{ flexRca || '&nbsp;' }}</p>
                        </div>

                    </div>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Cliente</legend>

                    <div class="flex gap-1.5 flex-row items-center">
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
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">{{cliente.razaoSocial ||
                                '&nbsp;' }}</p>
                        </div>
                    </div>
                    <dl>
                        <dd>
                            <details>
                                <summary class="text-xs uppercase opacity-75">Códigos extras</summary>
                                <CodesInput class="w-full border border-black" :data="clientes"
                                    @update:modelValue="updateClientesExtras" />
                            </details>
                        </dd>
                    </dl>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Produto</legend>

                    <div class="flex gap-1.5 flex-row items-center">
                        <div class="flex flex-col w-2/12">
                            <label class="text-xs uppercase opacity-75" for="codigoProduto">Código</label>
                            <input required v-model="produto.codigo"
                                class="rounded shadow-inner border border-black px-2 py-1" type="text"
                                @input="() => handleProdutoInput(produto.codigo)" list="produtoList">
                            <datalist id="produtoList">
                                <option v-for="item in produtos" :key="item.codigo" :value="item.codigo" />
                            </datalist>
                        </div>
                        <div class="flex flex-col w-full flex-grow flex-1">
                            <label class="text-xs uppercase opacity-75" for="descricaoProduto">Descrição</label>
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                                {{ produto.descricao || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-2/12">
                            <label class="text-xs uppercase opacity-75" for="fracionamentoProduto">Fracionamento</label>
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ produto.fracionamento || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-1/12">
                            <label class="text-xs uppercase opacity-75" for="precoUnitarioProduto">Preço Un.</label>
                            <p id="precoUnitarioProduto" class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ produto.precoUnitario || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-1/12">
                            <label class="text-xs uppercase opacity-75" for="precoUnitarioCx">Preço Cx.</label>
                            <p id="precoUnitarioCx" class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ produto.precoCx || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-1/12">
                            <label class="text-xs uppercase opacity-75 text-red-500" for="precoTotal">Preço Total</label>
                            <p id="precoTotal" class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ produto.precoTotal || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-1/12">
                            <label class="text-xs uppercase opacity-75" for="quantidade">Quantidade</label>
                            <input required v-model="quantidade"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="text"
                                name="quantidade" id="quantidade" @input="recalculateValues">
                        </div>
                    </div>
                    <dl>
                        <dd>
                            <details>
                                <summary class="text-xs uppercase opacity-75">Códigos extras</summary>
                                <CodesInput class="w-full border border-black" :data="produtos"
                                    @update:modelValue="updateProdutosExtras" />
                            </details>
                        </dd>
                    </dl>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Oferta</legend>
                    <div class="flex flex-col gap-1.5 md:flex-row">                        
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="descontoPercentual">Desconto (% sugerida)</label>
                            <input required v-model="descontoPercentual"
                                class="w-full mb-2 rounded shadow-inner border border-black px-2 py-1" type="number" min="0"
                                max="100" step="0.01" name="descontoPercentual" id="descontoPercentual"
                                @input="updateDescontoReais">
                            
                            <label class="text-xs uppercase opacity-75" for="descontoReais">Desconto (R$ sugerido)</label>
                            <input required v-model="descontoReais" :class="{'border-red-500': descontoReais < 35}"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="number" min="0"
                                :max="precoTabletTotal" step="0.01" name="descontoReais" id="descontoReais"
                                @input="updateDescontoPercentual">
                            <span v-if="descontoReais < 35" class="text-red-500 text-xs">O desconto deve ser maior que
                                R$ 35,00</span>
                        </div>
                        <div class="flex flex-col w-full">
                            <label class="text-xs uppercase opacity-75" for="precoSugeridoUnidade">Preço Un. (sugerido)</label>
                            <p required
                                class="font-mono w-full mb-2  rounded shadow-inner px-2 py-1 bg-gray-200"
                                type="text" name="precoSugeridoUnidade" id="precoSugeridoUnidade" readonly>{{
                                formatCurrency(precoSugeridoUnidade) }}</p>
                            
                            <label class="text-xs uppercase opacity-75" for="precoSugeridoCx">Preço Cx. (sugerido)</label>
                            <p required
                                class="font-mono w-full rounded shadow-inner px-2 py-1 bg-gray-200"
                                type="text" name="precoSugeridoCx" id="precoSugeridoCx" readonly>{{
                                formatCurrency(precoSugeridoCx) }}</p>
                        </div>
                    </div>
                </fieldset>

                <button type="submit"
                    :class="{ 'opacity-20 disabled cursor-not-allowed': !isValid, 'opacity-100': !!isValid }"
                    class="w-full bg-black text-white py-2 px-3 rounded shadow mt-6">Enviar</button>

            </form>
        </div>
        <div class="w-1/3 p-4 border-l">
            <h2 class="text-lg font-bold mb-4">Pré-visualização</h2>
            <div class="bg-[#faf6f4] shadow-md rounded-lg p-4 mb-4">
                <div class="flex items-start">
                    <div class="min-w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                    <div class="flex flex-col">
                        <span class="font-bold text-sm">Você</span>
                        <div class="bg-[#d9fdd3] text-gray-800 p-2 rounded-lg" v-html="previewMessage"></div>
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
const descontoPercentual = ref(0);
const descontoReais = ref(0);
const produto = ref({ codigo: '', descricao: '', precoTotal: '', precoUnitario: '', precoCx: '', fracionamento: '' });
const produtosExtras = ref([]);
const cliente = ref({ codigo: '', razaoSocial: '' });
const clientesExtras = ref([]);
const quantidade = ref(1);
const flexRca = ref('');
const produtos = ref([]);
const clientes = ref([]);
const precoTabletUnitario = computed(() => {
    if (!produto.value.precoUnitario) return null;

    return parseFloat(produto.value.precoUnitario);
});
const precoTabletTotal = computed(() => {
    if (!produto.value.precoCx || !quantidade.value) return null;

    return (parseFloat(produto.value.precoCx) * parseFloat(quantidade.value)).toFixed(4);
});

const precoTabletCx = computed(() => {
    if (!produto.value.precoCx) return null;

    return parseFloat(produto.value.precoCx).toFixed(4);
});

const precoSugeridoUnidade = computed(() => {
    const descontoUnidade = (precoTabletUnitario.value * descontoPercentual.value) / 100;    
    return (parseFloat(precoTabletUnitario.value) - descontoUnidade).toFixed(4);
});

const precoSugeridoCx = computed(() => {
    const descontoCx = (precoTabletCx.value * descontoPercentual.value) / 100;    
    return (parseFloat(precoTabletCx.value) - descontoCx).toFixed(4);
});

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

    return produtos.value.filter(produto => produto.descricao.toLowerCase().includes(term.toLowerCase()) || produto.codigo.toString().includes(term));
};

const getCliente = async (term) => {
    if (term.length < 1) return;

    return clientes.value.filter(cliente => cliente.razaoSocial.toLowerCase().includes(term.toLowerCase()) || cliente.codigo.toString().includes(term));
};

onMounted(async () => {
    await fetchProdutos();
    await fetchClientes();
});

const updateProduto = () => {
    const produtoEncontrado = produtos.value.find(p => p.codigo.toString() === produto.value.codigo);
    if (produtoEncontrado) {
        produto.value.descricao = produtoEncontrado.descricao;
        produto.value.precoTotal = produtoEncontrado.precoTotal;
        produto.value.precoCx = produtoEncontrado.precoCx;
        produto.value.precoUnitario = produtoEncontrado.precoUnitario;
        produto.value.fracionamento = produtoEncontrado.fracionamento;
    } else {
        produto.value.descricao = '';
        produto.value.precoTotal = '';
        produto.value.fracionamento = '';
        produto.value.precoUnitario = '';
        produto.value.precoCx = '';
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
    updateProduto();
};

const updateProdutosExtras = (novosCodigos) => {
    produtosExtras.value = novosCodigos;
};

const updateClientesExtras = (novosCodigos) => {
    clientesExtras.value = novosCodigos;
};

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const updateDescontoReais = () => {
    descontoReais.value = (precoTabletTotal.value * descontoPercentual.value) / 100;
};

const updateDescontoPercentual = () => {
    if (descontoReais.value > 0) {
        descontoPercentual.value = (descontoReais.value / precoTabletTotal.value) * 100;
    } else {
        descontoPercentual.value = 0;
    }
};

const recalculateValues = () => {
    updateDescontoReais();
    updateDescontoPercentual();
};

const whatsAppMessage = computed(() => {
    const produtosList = [produto.value.codigo, ...produtosExtras.value].join(' / ');
    const clientesList = [cliente.value.codigo, ...clientesExtras.value].join(' / ');
    let message = `*SOLICITAÇÃO DE OFERTA 🎯*\n\n` +
        `● *RCA*:  ${rca.value ?? '-'}\n` +
        `● *Preço Autorizado*:  ${precoSugeridoUnidade.value ?? '-'}\n` +
        `● *Descrição produto*: ${produto.value.descricao ?? '-'}\n` +
        `● *Código produto*: ${produtosList}\n` +
        `● *Razão Social cliente*: ${cliente.value.razaoSocial ?? '-'}\n` +
        `● *Código cliente*: ${clientesList}\n` +
        `● *Quantidade*:  ${quantidade.value ?? '-'}\n` +
        `● *Preço Tablet*:  ${precoTabletUnitario.value ?? '-'}\n` +
        `● *FLEX/RCA*:  ${flexRca.value ?? '-'}`;

    return message;
});

const previewMessage = computed(() => {
    const formatarLista = (lista) => lista.join(' / ');
    const formatarValor = (valor) => valor || '-';
    const formatarPrecoSugerido = () => {
        const precoUnidade = precoSugeridoUnidade.value || 0;
        const precoCx = precoSugeridoCx.value || 0;
        const precoFormatadoUnidade = formatCurrency(precoUnidade);
        const precoFormatadoCx = formatCurrency(precoCx);

        if (precoFormatadoCx !== precoFormatadoUnidade) {
            return `${precoFormatadoUnidade} (${precoFormatadoCx})`;
        }

        return precoFormatadoUnidade;
    };

    const campos = [
        { label: 'RCA', valor: formatarValor(rca.value) },
        { label: 'Preço Autorizado', valor: formatarPrecoSugerido() },
        { label: 'Descrição produto', valor: formatarValor(produto.value.descricao) },
        { label: 'Código produto', valor: formatarLista([produto.value.codigo, ...produtosExtras.value]) },
        { label: 'Razão Social cliente', valor: formatarValor(cliente.value.razaoSocial) },
        { label: 'Código cliente', valor: formatarLista([cliente.value.codigo, ...clientesExtras.value]) },
        { label: 'Quantidade', valor: `${quantidade.value} x (${produto.value.fracionamento})` },
        { label: 'Preço Tablet', valor: formatCurrency(precoTabletUnitario.value) },
        { label: 'FLEX/RCA', valor: formatarValor(flexRca.value) }
    ];

    const mensagemFormatada = campos.map(({ label, valor }) => `● <strong>${label}</strong>: ${valor}`).join('<br>');

    return `<strong>SOLICITAÇÃO DE OFERTA 🎯</strong><br><br>${mensagemFormatada}`;
});

const isValid = computed(() => {
    return !!rca.value &&
        !!precoSugeridoUnidade.value &&
        !!descontoPercentual.value &&
        !!produto.value.codigo &&
        !!quantidade.value &&
        !!precoTabletUnitario.value;
        // !!flexRca.value;
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

details {
    margin-top: 0.5rem;
}

summary {
    cursor: pointer;
    padding: 0.25rem 0;
}

summary:hover {
    text-decoration: underline;
}
</style>
