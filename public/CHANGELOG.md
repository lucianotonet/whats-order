# Changelog

_[09/09/2024 13:40](a668c1ac8127193c82c47ed99a7a1c5c177895cc)_
### Atualiza lógica de atualização do changelog

Melhorou a robustez do script de geração do changelog ao adicionar verificações de erro. Agora, o processo alerta para falhas ao mover ou copiar arquivos, garantindo que o changelog seja atualizado corretamente e informando o usuário em caso de problemas. Isso ajuda a prevenir possíveis inconsistências e facilita a manutenção do registro de alterações.


---


_[09/09/2024 13:34](2a1145abe7556396ce0d93ad1b24f7f07d814084)_
### Adiciona página de changelog e link no footer

Implementa uma nova página para exibir o changelog diretamente da documentação, melhorando a acessibilidade das notas de versão para os usuários. O link para o changelog foi adicionado no rodapé, incentivando os usuários a acompanhar as atualizações. Além disso, atualiza as dependências necessárias para suportar a renderização do conteúdo em Markdown. Isso proporciona uma experiência mais transparente e informativa.


---


_[09/09/2024 13:27](949414e4971a604da7851fa523aaff7354f03aa0)_
### Atualiza changelog e melhora integração do workflow

Adiciona um novo changelog, permitindo melhor rastreamento das alterações e versões. A integração com o workflow de deploy foi aprimorada, agora incluindo a geração automática do changelog durante as etapas de construção e geração. Essas atualizações visam aumentar a transparência das mudanças implementadas e garantir que usuários e desenvolvedores estejam sempre informados sobre as versões do aplicativo. A refatoração também simplifica o processo de deploy, melhorando a segurança e a manutenibilidade do código.


---


_[09/09/2024 12:55](c3e0380100bd3e89c458c4158654e53bbd0cd8bc)_
### Atualiza o rodapé e aprimora o upload de dados

- Adicionada uma classe de margem ao rodapé e alterado o elemento de exibição da versão para um texto menor, melhorando a apresentação visual.
- A lógica de carregamento de uploads foi centralizada e simplificada, utilizando propriedades computadas para melhor gerenciamento de estado, garantindo que o loading reflita corretamente o status de upload de clientes e produtos.
- Mensagens de sucesso consolidadas para clareza, fornecendo feedback mais direto após o processamento dos dados.


---


_[09/09/2024 12:46](51ad69b6f42396500658d69772ef654204a9876a)_
### Atualiza status de carregamento e mensagens de upload

Refina o tratamento de estados de carregamento na interface para distinguir entre conversões e uploads de arquivos, melhorando a experiência do usuário. Isso garante feedback visual claro durante processos distintos, além de evitar confusões sobre o estado da operação em andamento. Também desativa a opção de enviar arquivos até que o carregamento do arquivo anterior seja concluído, prevenindo possíveis erros.


---


_[09/09/2024 12:40](22c80a1fe90fb83efee75a9111cae437215ae253)_
### Atualiza layout e funcionalidades na página de dados

Melhorias na interface de usuário e integração do sistema foram implementadas na página de dados, incluindo a adição de seções para upload de clientes e produtos, feedback visual de carregamento, e gerenciamento de dados com mensagens de sucesso. Essas mudanças visam aprimorar a experiência do usuário ao facilitar operações de importação e exclusão de dados, tornando o sistema mais interativo e informativo.


---


_[09/09/2024 12:35](664130d29d2a01c9c0c47ed1a26677412b75cdae)_
### Atualiza a geração e recuperação da versão da API

Ajusta a aplicação para buscar informações de versão diretamente da nova rota de API, melhorando a estrutura de dados. A mudança também renomeia o script de geração da versão para JavaScript e garante que o arquivo gerado esteja na pasta apropriada, facilitando o acesso e a manutenção. Essas modificações promovem uma integração mais clara entre o frontend e o backend.


---


_[09/09/2024 12:29](e2b499c13ba4fd79cf093fac55c3bde147635e1e)_
### Adiciona rodapé e gera informações de versão

Implementa um novo componente de rodapé que exibe a versão da aplicação, obtendo automaticamente os dados a partir de um arquivo JSON. Agora, o rodapé é incluído em páginas principais, melhorando a apresentação das informações de versionamento. Um script foi adicionado para gerar as informações de versão automaticamente durante o processo de build, garantindo que os usuários sempre vejam dados atualizados. Esses aprimoramentos ajudam a manter a transparência sobre a versão da aplicação e otimizam a experiência do usuário.


---


_[09/09/2024 12:24](7db6b9f32214bc5e2595b8c63468fb5d11d72b4f)_
### Implementa feedback de carregamento para clientes e produtos

Adiciona indicadores de carregamento que melhoram a experiência do usuário ao exibir "Carregando..." enquanto os dados dos clientes e produtos são recuperados. Essa mudança proporciona clareza em relação ao estado da aplicação e evita confusões ao acessar dados ainda não disponíveis, resultando em uma interação mais intuitiva. Além disso, captura e trata erros durante o carregamento, garantindo uma maior robustez do sistema.


---


_[09/09/2024 12:21](a30374d22cbb99ab615b23a129d49873a8ebd66e)_
### Refactor API endpoints to include /api prefix

Updated fetch requests to use the /api prefix for produtos and clientes data. This adjustment standardizes the API endpoint structure, improving consistency and aligning with backend changes, ultimately enhancing the application's scalability and maintainability.


---


_[09/09/2024 12:15](a8f923dfddaa3050f4a54d2eb58559132a4411af)_
### Melhoria na interface de upload de arquivos

Aprimorada a aparência e a usabilidade da seção de upload, incluindo novas funcionalidades de exclusão de clientes e produtos. As mudanças visam melhorar a experiência do usuário, tornando a interface mais intuitiva e responsiva, além de condizer com a identidade visual da aplicação. As mensagens de feedback também foram otimizadas para proporcionar melhor clareza durante as interações.


---


_[09/09/2024 12:08](d3805143a045116306e1c0e4e03f8e1a1c4a69cd)_
### Adicionar funcionalidades de exclusão e reorganização de API

Implementadas novas opções para excluir clientes e produtos diretamente da interface, melhorando a usabilidade. Além disso, a lógica de manipulação de arquivos foi centralizada em um único ponto de acesso na API, facilitando a manutenção e expansão de futuras funcionalidades. Com essa organização, qualquer operação de exclusão agora retorna mensagens claras de sucesso ou erro, garantindo um feedback mais eficaz para o usuário.


---


_[09/09/2024 11:28](cc3f55a6c7cfe6de838911d52a7b2a4d6649056c)_
### Atualiza workflow de deploy: melhora a estrutura e segurança

Refatoração do workflow de deploy para remover passos de depuração e otimizar a configuração. A inclusão direta das etapas de checkout, instalação de dependências e envio de arquivos via FTP facilita a execução do processo e aumenta a segurança ao eliminar a exposição desnecessária de credenciais no log. Essa abordagem mais enxuta também assegura uma melhor legibilidade e manutenção do arquivo de configuração.


---


_[09/09/2024 11:23](c84cad93fd45a844acbf2876bd66dbd39ce861b2)_
### Melhora no registro de informações de debug

Redireciona as saídas de debug para um arquivo, melhorando a gestão de informações sensíveis durante o processo de CI/CD. Isso facilita a revisão dos dados sem expor informações no console, aumentando a segurança e a organização do log.


---


_[09/09/2024 11:21](fe1524d83d1ae657e9c09b3f727d56719778beff)_
### Adiciona etapa de depuração na configuração do workflow

Inclui comandos para exibir informações de FTP durante a execução do workflow, facilitando a identificação de problemas de conexão ou autenticação antes do deploy. Comentários também foram adicionados para desabilitar temporariamente a etapa de checkout, permitindo uma abordagem de teste mais controlada.


---


_[09/09/2024 11:20](ad991c3059492cd613f836a6827852b219e84333)_
### Melhora na depuração das credenciais FTP

Ajuste na saída de debug para exibir separadamente o host, usuário e senha do FTP, facilitando a identificação de problemas durante a configuração do workflow. Essa mudança melhora a clareza das informações na execução do ciclo de integração contínua.


---


_[09/09/2024 11:18](9bba4a46622e6908fc5d6e731cbd6b3ee79a0d0a)_
### Atualiza workflow para deploy com log de debug

Habilita o checkout do repositório e adiciona output de debug para credenciais FTP, facilitando a resolução de problemas durante a implementação. Comenta a etapa de envio de arquivos, evitando deploys indesejados até que as configurações sejam confirmadas. Essa mudança aprimora a visibilidade do processo de deploy e reduz o risco de erros.


---


_[09/09/2024 11:17](e4cfa1e2478eba21f706795f687b179e3f63b6ef)_
### Desabilita etapas de construção no workflow de deploy

Comentei as etapas de checkout, configuração do Node e construção do projeto no workflow, priorizando o envio de arquivos via FTP. Essa mudança visa simplificar o processo de deployment e facilitar o diagnóstico, fornecendo logs detalhados sobre a conexão FTP para melhor monitoramento.


---


_[09/09/2024 11:02](705fa6029ee8fc0ac82ef88b631357aab236da58)_
### Migrando para static host



---


_[08/09/2024 19:37](4f5d52ea966e739cd0cefa81da6a493cbc6ad113)_
### Refatorar carregamento e adição de novas buscas

Simplifica as funções de carregamento de clientes e produtos, removendo o parâmetro de busca, já que os dados são carregados completos. Nova funcionalidade de busca introduzida permite filtrar clientes e produtos diretamente no estado, melhorando a usabilidade e desempenho com resultados limitados a 10 itens. Além disso, foram implementadas funções para buscar clientes e produtos por código, facilitando o acesso a dados específicos.


---


_[08/09/2024 19:37](af71a9a15b3dc7502462efa067d581be63285e57)_
### Refine input handling and streamline calculations

Improved the input handling for cliente and produto codes by filtering suggestions based on the input length, enhancing user experience. Simplified recalculations of flexRCA, ensuring values are updated more efficiently whenever relevant input changes occur. This allows for more accurate real-time feedback and responsiveness in the application. Also removed unnecessary elements to clean up the code and reduce clutter, which aids in maintainability.


---


_[08/09/2024 18:17](cb505572fa3e30a864fcd16cae2865be9cc6e548)_
### Remove hardcoded data



---


_[03/09/2024 23:53](61d7653c8f0de02899d318630846bd2391f35c2e)_
### Atualiza formatação e lógica de cálculo de preços

As alterações aprimoram a apresentação dos preços, adicionando formatação consistente e ajustes na exibição de valores. O cálculo de descontos agora também garante precisão com valores arredondados para duas casas decimais, melhorando a clareza e evitando confusões. Além disso, foram introduzidas funções auxiliares para formatar listas e valores, tornando o código mais limpo e reutilizável. A URL do WhatsApp foi ajustada para variar entre ambientes de desenvolvimento e produção, garantindo uma integração mais robusta.


---


_[03/09/2024 23:19](c14fc7dd31931630e014501c62cb59a56992fdf6)_
### Melhora a interface do formulário de solicitação de oferta

Refatora o layout do formulário para oferecer uma experiência mais intuitiva e organizada, ajustando a disposição dos campos e reduzindo o espaçamento excessivo. Adiciona novos cálculos para o preço sugerido e autorizado, garantindo que os usuários tenham informações mais precisas. Ao implementar o formato para campos monetários, melhora a apresentação dos valores, tornando a interface mais amigável e acessível, o que pode aumentar a eficiência na apresentação e no processamento de ofertas.


---


_[03/09/2024 00:08](8f25c98b210f4650dc5bc857f77d5057c59f523e)_
### Aprimora formulário de solicitação de oferta

Expande a interface do formulário, incrementando a apresentação de informações do cliente e do produto, além de permitir ajustes automáticos nos preços sugeridos baseados em descontos. Melhora a usabilidade ao adicionar legendas, listas e validações mais claras, assegurando que o usuário tenha uma experiência mais eficiente e intuitiva.


---


_[30/08/2024 03:29](1df3521c77cc39535fa46a37d0ef1acab5c13b99)_
### Adiciona Tailwind CSS, Shadcn UI e modifica inputs de códigos

Implementa o Tailwind CSS para estilização moderna, adicionando um novo arquivo de configurações e um conjunto de componentes reutilizáveis para a interface. Essa mudança permite um design mais coeso e responsivo, facilitando a manutenção e evolução da aplicação. Os novos elementos de UI incluem inputs de tags, comandos e diálogos, que melhoram a interatividade e usabilidade da aplicação.


---


_[28/08/2024 21:50](8aaf713e682a164736eda5c1d3581b98adb166be)_
### Adiciona layout e configurações de fontes usando Roboto

Implementa um novo layout com suporte ao Nuxt, além de integrar a fonte Roboto para uma melhor experiência visual. O código inclui elementos de configuração e novas páginas, substituindo a página de administração removida. Elimina a complexidade do gerenciamento anterior dos uploads de clientes e produtos, integrando funcionalidades em uma nova página de configurações e simplificando o fluxo de dados. A mudança melhora a estética e a funcionalidade da aplicação, promovendo uma interface mais coesa e moderna.


---


_[28/08/2024 04:37](f5045c0a96ca682b0a7d1ce97bdbf6877b8c8ec0)_
### Adiciona sistema de upload e gerenciamento de dados

Implantada a funcionalidade de upload de clientes e produtos via arquivos Excel, melhorando a facilidade de gerenciamento de dados no painel de administração. A estrutura foi refinada com a inclusão do Pinia para gerenciamento de estado, o que simplifica o acesso e a manipulação dos dados de clientes e produtos. Adicionalmente, a interface do usuário foi aprimorada, proporcionando um design mais intuitivo e responsivo. Essas alterações visam otimizar a experiência do usuário e a eficiência do sistema.


---


_[28/08/2024 00:58](18e90e7993beace047e86b1220a5169c39b823a8)_
### First commit



---
