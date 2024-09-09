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
    async loadClientes() {
      const response = await fetch('/api/clientes.json');
      if (response.ok) {
        this.clientes = await response.json();
      } else {
        console.warn('Arquivo de clientes não encontrado.');
      }
    },
    async loadProdutos() {
      const response = await fetch('/api/produtos.json');
      if (response.ok) {
        this.produtos = await response.json();
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
        const response = await fetch('/api/index.php', { // Alterado para o script PHP
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ type, data: JSON.stringify(data) }), // Enviando os dados
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error('Falha ao salvar os dados no servidor');
        }
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
      }
    },
    async deleteData(type: string) { // Novo método para exclusão
      try {
        const response = await fetch('/api/index.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ type, action: 'delete' }), // Enviando a ação de exclusão
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error('Falha ao excluir os dados no servidor');
        }
      } catch (error) {
        console.error('Erro ao excluir os dados:', error);
      }
    },
    searchClientes(term: string): Cliente[] {
      const lowercaseTerm = term.toLowerCase();
      return this.clientes
        .filter(cliente => 
          cliente.codigo.toLowerCase().includes(lowercaseTerm) ||
          cliente.razaoSocial.toLowerCase().includes(lowercaseTerm)
        )
        .slice(0, 10); // Limita o resultado a 10 itens
    },
    searchProdutos(term: string): Produto[] {
      const lowercaseTerm = term.toLowerCase();
      return this.produtos
        .filter(produto => 
          produto.codigo.toLowerCase().includes(lowercaseTerm) ||
          produto.descricao.toLowerCase().includes(lowercaseTerm)
        )
        .slice(0, 10); // Limita o resultado a 10 itens
    },
    getClienteByCodigo(codigo: string): Cliente | undefined {
      return this.clientes.find(cliente => cliente.codigo === codigo);
    },
    getProdutoByCodigo(codigo: string): Produto | undefined {
      return this.produtos.find(produto => produto.codigo === codigo);
    }
  },
  getters: {
    totalClientes: (state) => state.clientes.length,
    totalProdutos: (state) => state.produtos.length,
  },
})