<template>
    <div class="mx-auto px-12 md:px-24 w-full py-6 md:py-12">

        <div class="max-w-lg mx-auto">
            <h1 class="text-2xl font-black mb-8">SOLICITAÇÃO DE OFERTA 🎯 <small>v2.0</small></h1>
            <form @submit.prevent="sendOrder" class="grid gap-y-1">
                <label for="rca">RCA</label>

                <input required v-model="rca" class="w-full border border-black px-2 py-1 mb-4" type="text" name="rca"
                    id="rca">

                <label for="precoAutorizado">Preço Autorizado</label>

                <input required v-model="precoAutorizado" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="precoAutorizado" id="precoAutorizado">

                <label for="descricaoProduto">Descrição do Produto</label>

                <input required v-model="descricaoProduto" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="descricaoProduto" id="descricaoProduto">

                <label for="codigoProduto">Código do Produto</label>

                <input required v-model="codigoProduto" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="codigoProduto" id="codigoProduto">

                <label for="razaoSocialCliente">Razão Social do Cliente</label>

                <input required v-model="razaoSocialCliente" class="w-full border border-black px-2 py-1 mb-4"
                    type="text" name="razaoSocialCliente" id="razaoSocialCliente">

                <label for="codigoCliente">Código do Cliente</label>

                <input required v-model="codigoCliente" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="codigoCliente" id="codigoCliente">

                <label for="quantidade">Quantidade</label>

                <input required v-model="quantidade" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="quantidade" id="quantidade">

                <label for="precoTablet">Preço Tablet</label>

                <input required v-model="precoTablet" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="precoTablet" id="precoTablet">

                <label for="flexRca">FLEX/RCA</label>

                <input required v-model="flexRca" class="w-full border border-black px-2 py-1 mb-4" type="text"
                    name="flexRca" id="flexRca">

                <button type="submit" :class="{
                'opacity-20 disabled cursor-not-allowed': !isValid,
                'opacity-100': !!isValid
            }" class="w-full bg-black text-white py-2 px-3">Enviar</button>
            </form>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';

const phoneNumber = ref('5554999256258'); // 😅
const rca = ref(null);
const precoAutorizado = ref(null);
const descricaoProduto = ref(null);
const codigoProduto = ref(null);
const razaoSocialCliente = ref(null);
const codigoCliente = ref(null);
const quantidade = ref(null);
const precoTablet = ref(null);
const flexRca = ref(null);

const whatsAppLink = computed(() => {
    let br = "%0A";

    let message = `
⛔ *SOLICITAÇÃO DE OFERTA* 🎯${br} 
${br} 
● *RCA*:  ${rca.value ?? '-'}${br} 
● *Preço Autorizado*:  ${precoAutorizado.value ?? '-'}${br} 
● *Descrição produto*:  ${descricaoProduto.value ?? '-'}${br} 
● *Código produto*:  ${codigoProduto.value ?? '-'}${br} 
● *Razão Social cliente*:  ${razaoSocialCliente.value ?? '-'}${br} 
● *Código do cliente*:  ${codigoCliente.value ?? '-'}${br} 
● *Quantidade*:  ${quantidade.value ?? '-'}${br} 
● *Preço Tablet*:  ${precoTablet.value ?? '-'}${br} 
● *FLEX/RCA*:  ${flexRca.value ?? '-'}${br}
`;

    return `https://api.whatsapp.com/send?phone=${phoneNumber.value}&text=${message}%0A`;
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