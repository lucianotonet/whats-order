<template>
    <div class="mx-auto w-full py-4 flex flex-col min-h-screen">
        <div class="flex flex-col max-w-5xl mx-auto w-full gap-10">

            <div class="flex justify-between items-center mb-6 w-full text-center md:text-left border-b pb-4">
                <h1 class="text-2xl font-black w-full">SOLICITAÇÃO DE OFERTA</h1>
            </div>

            <form @submit.prevent="sendOrder" class="grid gap-10">
                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Vendedor</legend>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-col w-full md:w-2/3">
                            <label class="text-xs uppercase opacity-75" for="rca">RCA</label>
                            <input required v-model="rca"
                                class="w-full rounded shadow-inner border border-black px-2 py-1" type="text" name="rca"
                                id="rca">
                        </div>
                    </div>
                </fieldset>

                <fieldset class="fieldset border p-4">
                    <legend class="uppercase px-2 -mx-2">Cliente</legend>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-col w-full md:w-1/6">
                            <label class="text-xs uppercase opacity-75" for="codigoCliente">Código</label>
                            <input required v-model="cliente.codigo"
                                class="rounded shadow-inner border border-black px-2 py-1" type="text"
                                @input="handleClienteInput(cliente.codigo)">
                            <datalist id="clienteList">
                                <option v-for="cliente in filteredClientes" :key="cliente.codigo"
                                    :value="cliente.codigo" />
                            </datalist>
                        </div>
                        <div class="flex flex-col w-full md:flex-grow">
                            <label class="text-xs uppercase opacity-75" for="razaoSocialCliente">Razão Social</label>
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">{{ cliente.razaoSocial ||
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

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-col w-full md:w-2/12">
                            <label class="text-xs uppercase opacity-75" for="codigoProduto">Código</label>
                            <input required v-model="produto.codigo"
                                class="rounded shadow-inner border border-black px-2 py-1" type="text"
                                @input="handleProdutoInput(produto.codigo)">
                            <datalist id="produtoList">
                                <option v-for="item in filteredProdutos" :key="item.codigo" :value="item.codigo" />
                            </datalist>
                        </div>
                        <div class="flex flex-col w-full md:flex-grow">
                            <label class="text-xs uppercase opacity-75" for="descricaoProduto">Descrição</label>
                            <p
                                class="w-full rounded shadow-inner px-2 py-1 bg-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                                {{ produto.descricao || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-full md:w-2/12">
                            <label class="text-xs uppercase opacity-75" for="fracionamentoProduto">Fracionamento</label>
                            <p class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ produto.fracionamento || '&nbsp;' }}
                            </p>
                        </div>
                        <div class="flex flex-col w-full md:w-1/12">
                            <label class="text-xs uppercase opacity-75" for="precoUnitarioProduto">Preço Un.</label>
                            <p id="precoUnitarioProduto" class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ formatCurrency(produto.precoUnitario) }}
                            </p>
                        </div>
                        <div class="flex flex-col w-full md:w-1/12">
                            <label class="text-xs uppercase opacity-75" for="precoUnitarioCx">Preço Cx.</label>
                            <p id="precoUnitarioCx" class="w-full rounded shadow-inner px-2 py-1 bg-gray-200">
                                {{ formatCurrency(produto.precoCx) }}
                            </p>
                        </div>
                        <div class="flex flex-col w-full md:w-1/12">
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

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-col w-full md:w-auto">
                            <label class="text-xs uppercase opacity-75 text-right md:text-left"
                                for="ofertaDescontoPercentual">Desconto
                                %</label>
                            <input required v-model="ofertaDescontoPercentual"
                                class="w-full md:min-w-32 rounded shadow-inner border text-right border-black px-1 py-1"
                                type="number" min="0" max="100" step="0.01" name="ofertaDescontoPercentual"
                                id="ofertaDescontoPercentual" @input="updateOfertaPrecoUnitario">
                        </div>

                        <div
                            class="flex flex-col items-center justify-end w-full md:flex-row md:w-auto md:mt-4 text-xs uppercase opacity-75">
                            ou</div>

                        <div class="flex flex-col w-full md:w-auto">
                            <label class="text-xs uppercase opacity-75 text-right md:text-left"
                                for="ofertaPrecoUnitario">Preço
                                unitário</label>
                            <input v-model="ofertaPrecoUnitario"
                                class="rounded shadow-inner text-right w-full md:min-w-32 border border-black px-1 py-1"
                                id="ofertaPrecoUnitario" name="ofertaPrecoUnitario" type="number" min="0" step="0.01"
                                @input="updateOfertaDescontoPercentual">
                        </div>

                        <div
                            class="flex flex-col items-center justify-end w-full md:flex-row md:w-auto md:mt-4 text-xs uppercase opacity-75">
                            =</div>

                        <div class="flex flex-col w-auto md:w-auto">

                            <label class="text-xs uppercase opacity-75 text-right md:text-left"
                                for="ofertaDescontoReais">Desconto R$</label>

                            <div class="flex flex-1 flex-col md:flex-row items-center justify-end">

                                <p :class="{ 'text-red-500 border-red-500': ofertaDescontoReais < 35 }"
                                    class="w-full md:min-w-32 border text-right rounded shadow-inner px-2 py-1 bg-gray-200">
                                    {{
                formatCurrency(ofertaDescontoReais)
            }}</p>

                                <small v-if="ofertaDescontoReais < 35"
                                    class="text-red-500 text-xs text-left md:ml-4 mb-1">⚠️
                                    O
                                    desconto deve
                                    ser maior que R$ 35,00</small>
                            </div>


                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-2 border-t pt-2 mt-6">
                        <div class="flex flex-col w-full md:w-1/2">
                            <div class="flex items-center my-2">
                                <input type="checkbox" id="liberadoAlcione" v-model="isLiberadoAlcione" class="mr-2">
                                <label for="liberadoAlcione"
                                    class="text-xs uppercase opacity-75 text-right md:text-left">Há valor liberado por
                                    Alcione?</label>
                            </div>

                            <input v-if="isLiberadoAlcione" v-model="precoAutorizadoAlcione"
                                :class="{ 'border-red-500': !precoAutorizadoAlcione }"
                                class="w-full md:min-w-64 text-right rounded shadow-inner border border-black px-2 py-1"
                                type="number" min="0" step="0.01" name="precoAutorizadoAlcione"
                                id="precoAutorizadoAlcione" @input="updatePrecosAutorizados">
                        </div>

                        <div v-if="isLiberadoAlcione && flexRca > 0" class="flex flex-col w-full md:w-1/2">

                            <label class="text-xs uppercase opacity-75 text-right md:text-left mt-4"
                                for="flexRca">FLEX/RCA</label>

                            <div class="flex flex-grow flex-col md:flex-row items-center justify-end">
                                <p class="w-full md:min-w-32 text-right rounded shadow-inner px-2 py-1 bg-gray-200">{{
                formatCurrency(flexRca)
            }}</p>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset class="fieldset border p-4" v-show="false">
                    <legend class="uppercase px-2 -mx-2">DEBUG</legend>
                    <div class="flex flex-col gap-4 md:flex-row">
                        <div class="flex w-full md:flex-row gap-4">
                            <div class="flex flex-col w-full">
                                <label class="text-xs uppercase opacity-75 text-center">OFERTA</label>
                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text"
                                        name="ofertaPrecoUnitario" id="ofertaPrecoUnitario" readonly>{{
                formatCurrency(ofertaPrecoUnitario) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Un.</small>
                                </div>

                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text" name="precoSugeridoCx"
                                        id="precoSugeridoCx" readonly>{{ formatCurrency(precoSugeridoCx) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Cx.</small>
                                </div>

                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text" name="ofertaPrecoTotal"
                                        id="ofertaPrecoTotal" readonly>{{
                formatCurrency(ofertaPrecoTotal) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Total</small>
                                </div>

                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text" name="flexRca"
                                        id="flexRca" readonly>{{ formatCurrency(flexRca) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">FLEX/RCA</small>
                                </div>

                                <div class="flex justify-center items-center gap-4 mt-2">
                                    <p required class="font-mono w-full text-right" type="text"
                                        name="ofertaDescontoReais" id="ofertaDescontoReais" readonly
                                        :class="{ 'text-red-500': ofertaDescontoReais < 35 }">
                                        {{ formatCurrency(ofertaDescontoReais) }}
                                    </p>
                                    <small class="w-full text-left uppercase opacity-75">Desconto R$</small>
                                </div>
                                <span v-if="ofertaDescontoReais < 35" class="text-red-500 text-xs text-right">O desconto
                                    deve
                                    ser maior que R$ 35,00</span>
                            </div>
                            <div v-if="isLiberadoAlcione" class="flex flex-col w-full">
                                <label class="text-xs uppercase opacity-75 text-center">AUTORIZADO</label>
                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text"
                                        name="precoAutorizadoUnidade" id="precoAutorizadoUnidade" readonly>{{
                formatCurrency(precoAutorizadoUnidade) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Un.</small>
                                </div>

                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text" name="precoAutorizadoCx"
                                        id="precoAutorizadoCx" readonly>{{ formatCurrency(precoAutorizadoCx) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Cx.</small>
                                </div>

                                <div class="flex justify-center items-center gap-4">
                                    <p required class="font-mono w-full text-right" type="text"
                                        name="precoAutorizadoTotal" id="precoAutorizadoTotal" readonly>{{
                                        formatCurrency(precoAutorizadoTotal) }}</p>
                                    <small class="w-full text-left uppercase opacity-75">Total</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div class="px-4 md:px-0">
                    <button type="submit"
                        :class="{ 'opacity-20 disabled cursor-not-allowed': !isValid, 'opacity-100': !!isValid }"
                        class="w-full bg-black text-white py-2 px-3 rounded shadow mt-6 uppercase">Enviar
                        oferta</button>

                </div>
            </form>
            
            <AppFooter />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import CodesInput from '~/components/CodesInput.vue';
import { useMainStore } from '~/stores/main';
import AppFooter from '~/components/AppFooter.vue';

const store = useMainStore();

const rca = ref(null);
const ofertaDescontoPercentual = ref(0);
const ofertaPrecoUnitario = ref(0);
const ofertaDescontoReais = ref(0);

const produto = ref({ codigo: '', descricao: '', precoTotal: '', precoUnitario: '', precoCx: '', fracionamento: '' });
const produtosExtras = ref([]);
const cliente = ref({ codigo: '', razaoSocial: '' });
const clientesExtras = ref([]);
const quantidade = ref(1);
const flexRca = ref(0);
const produtos = ref([]);
const clientes = ref([]);
const filteredClientes = ref([]);
const filteredProdutos = ref([]);
const isLiberadoAlcione = ref(false);

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

const precoSugeridoCx = computed(() => {
    const descontoCx = (precoTabletCx.value * ofertaDescontoPercentual.value) / 100;
    return (parseFloat(precoTabletCx.value) - descontoCx).toFixed(4);
});

const ofertaPrecoTotal = computed(() => {
    if (!precoTabletTotal.value) return null;
    const descontoTotal = (precoTabletTotal.value * ofertaDescontoPercentual.value) / 100;
    return (parseFloat(precoTabletTotal.value) - descontoTotal).toFixed(4);
});

const precoAutorizadoAlcione = ref(isLiberadoAlcione.value ? 0 : null); // Set to zero or null based on isLiberadoAlcione
const precoAutorizadoUnidade = computed(() => {
    return precoAutorizadoAlcione.value;
});

const precoAutorizadoCx = computed(() => {
    const unidadesPorProduto = parseInt(produto.value.fracionamento.split(/[^0-9]/)[0]) || 1;
    return precoAutorizadoUnidade.value * unidadesPorProduto;
});

const precoAutorizadoTotal = computed(() => {
    const unidadesPorProduto = parseInt(produto.value.fracionamento.split(/[^0-9]/)[0]) || 1;
    return (precoAutorizadoUnidade.value * unidadesPorProduto * quantidade.value).toFixed(4);
});

const recalculateValues = () => {
    updateFlexRca();
    updateOfertaPrecoUnitario();
};

const fetchProdutos = async () => {
    const response = await fetch('/api/produtos.json');
    if (response.ok) {
        const allProdutos = await response.json();
        produtos.value = allProdutos;
    } else {
        console.warn('Arquivo de produtos não encontrado.');
    }
}

const fetchClientes = async () => {
    const response = await fetch('/api/clientes.json');
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
    updateFlexRca();
};

const updateDescricaoCliente = () => {
    const clienteEncontrado = clientes.value.find(p => p.codigo.toString() === cliente.value.codigo);
    if (clienteEncontrado) {
        cliente.value.razaoSocial = clienteEncontrado.razaoSocial;
    } else {
        cliente.value.razaoSocial = '';
    }
    updateFlexRca();
};

const handleClienteInput = async (codigo) => {
    cliente.value.codigo = codigo;
    if (codigo.length > 2) {
        filteredClientes.value = await getCliente(codigo);
    } else {
        filteredClientes.value = [];
    }
    updateDescricaoCliente();
};

const handleProdutoInput = async (codigo) => {
    produto.value.codigo = codigo;
    if (codigo.length > 2) {
        filteredProdutos.value = await getProduto(codigo);
    } else {
        filteredProdutos.value = [];
    }
    updateProduto();
};

const updateProdutosExtras = (novosCodigos) => {
    produtosExtras.value = novosCodigos;
    updateFlexRca();
};

const updateClientesExtras = (novosCodigos) => {
    clientesExtras.value = novosCodigos;
    updateFlexRca();
};

const formatCurrency = (value) => {
    if (!value || isNaN(value)) value = 0;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

const updateDescontoReais = () => {
    ofertaDescontoReais.value = ((precoTabletTotal.value * ofertaDescontoPercentual.value) / 100).toFixed(2);
    updateFlexRca();
};

const updateOfertaPrecoUnitario = () => {
    ofertaPrecoUnitario.value = produto.value.precoUnitario - (ofertaDescontoPercentual.value / 100 * produto.value.precoUnitario);
    updateDescontoReais();
};
const updateOfertaDescontoPercentual = () => {
    let value = -((ofertaPrecoUnitario.value - produto.value.precoUnitario) / produto.value.precoUnitario) * 100;
    ofertaDescontoPercentual.value = value.toFixed(2);
    updateDescontoReais();
};

const updatePrecosAutorizados = () => {
    if (!isLiberadoAlcione.value) {
        precoAutorizadoAlcione.value = 0; // Set to zero if not checked
    }
    updateFlexRca();
};

const updateFlexRca = () => {
    const diff = precoAutorizadoTotal.value - ofertaPrecoTotal.value;
    flexRca.value = diff > 0 ? diff : 0;
};

// Observadores para atualizar FLEX/RCA quando os valores relevantes mudarem
watch([rca, ofertaDescontoPercentual, ofertaDescontoReais, produto, quantidade, precoAutorizadoAlcione], updateFlexRca);

const isValid = computed(() => {
    return !!rca.value &&
        !!ofertaPrecoUnitario.value &&
        !!ofertaDescontoPercentual.value &&
        !!produto.value.codigo &&
        !!quantidade.value &&
        !!precoTabletUnitario.value &&
        ofertaDescontoReais.value >= 35; // Ensure ofertaDescontoReais is at least 35
});

const whatsAppMessage = computed(() => {
    const formatarLista = (lista) => lista.join(' / ');
    const formatarValor = (valor) => valor || '-';
    const formatarPrecoSugerido = () => {
        const precoUnidade = ofertaPrecoUnitario.value || 0;
        const precoCx = precoSugeridoCx.value || 0;
        const precoFormatadoUnidade = formatCurrency(precoUnidade);
        const precoFormatadoCx = formatCurrency(precoCx);

        if (precoFormatadoCx !== precoFormatadoUnidade) {
            return `${precoFormatadoUnidade} (${precoFormatadoCx})`;
        }

        return precoFormatadoUnidade;
    };

    let message = `*SOLICITAÇÃO DE OFERTA 🎯*\n\n` +
        `● *RCA*:  ${rca.value ?? '-'}\n` +
        `● *Preço Autorizado*:  ${formatarPrecoSugerido()}\n` +
        `● *Descrição produto*: ${formatarValor(produto.value.descricao)}\n` +
        `● *Código produto*: ${formatarLista([produto.value.codigo, ...produtosExtras.value])}\n` +
        `● *Razão Social cliente*: ${formatarValor(cliente.value.razaoSocial)}\n` +
        `● *Código cliente*: ${formatarLista([cliente.value.codigo, ...clientesExtras.value])}\n` +
        `● *Quantidade*:  ${quantidade.value ?? '-'} x (${produto.value.fracionamento})\n` +
        `● *Preço Tablet*:  ${formatCurrency(precoTabletUnitario.value)} ${precoAutorizadoAlcione.value ? '(AUT. ' + formatCurrency(precoAutorizadoAlcione.value) + ')' : ''}\n` +
        `● *FLEX/RCA*:  ${flexRca.value != 0 ? formatCurrency(flexRca.value) : ''}`;

    return message;
});

const sendOrder = () => {
    if (isValid.value) {
        const phone = import.meta.env.MODE === 'development' ? '5554996132844' : '5554999256258';
        const link = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(whatsAppMessage.value)}`;
        window.open(link, '_new');
    } else {
        alert('Preencha todos os campos e o desconto deve ser maior ou igual a R$ 35,00');
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
