import { defineStore } from 'pinia'

interface Cliente {
  codigo: string
  razaoSocial: string
}

interface Produto {
  codigo: string
  descricao: string
  fracionamento: string
  precoUnitario: number
  precoCx: number
  precoTotal: number
}

export const useMainStore = defineStore('main', {
  state: () => ({
    clientes: [] as Cliente[],
    produtos: [] as Produto[],
  }),
  actions: {
    async loadClientes(term: string = '') {
      const response = await fetch('/clientes.json');
      if (response.ok) {
        const allClientes = await response.json();
        this.clientes = allClientes.filter((cliente: { razaoSocial: string }) => cliente.razaoSocial.toLowerCase().includes(term.toLowerCase()));
      } else {
        console.warn('Arquivo de clientes não encontrado.');
      }
    },
    async loadProdutos(term: string = '') {
      const response = await fetch('/produtos.json');
      if (response.ok) {
        const allProdutos = await response.json();
        this.produtos = allProdutos.filter((produto: { descricao: string }) => produto.descricao.toLowerCase().includes(term.toLowerCase()));
      } else {
        console.warn('Arquivo de produtos não encontrado.');
      }
    },
    async setClientes(clientes: Cliente[]) {
      this.clientes = clientes;
      await this.saveDataToServer('clientes', clientes);
    },
    async setProdutos(produtos: Produto[]) {
      this.produtos = produtos;
      await this.saveDataToServer('produtos', produtos);
    },
    async saveDataToServer(type: string, data: any) {
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type, data }),
        });
        if (!response.ok) {
          throw new Error('Falha ao salvar os dados no servidor');
        }
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    },
  },
  getters: {
    totalClientes: (state) => state.clientes.length,
    totalProdutos: (state) => state.produtos.length,
  },
})