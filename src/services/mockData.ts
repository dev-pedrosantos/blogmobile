export interface Usuario {
  id: string;
  email: string;
  senha: string;
  tipo: 'professor' | 'aluno';
  nome: string;
}

export interface Professor {
  id: string;
  nome: string;
  email: string;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
}

export interface Post {
  id: string;
  titulo: string;
  conteudo: string;
  descricao: string;
  autor: Professor;
  dataCriacao: string;
}

export const usuarios: Usuario[] = [
  {
    id: '1',
    email: 'professor@blog.com',
    senha: '123456',
    tipo: 'professor',
    nome: 'Professor Silva'
  },
  {
    id: '2',
    email: 'aluno@blog.com',
    senha: '123456',
    tipo: 'aluno',
    nome: 'Aluno Costa'
  }
];

export const professores: Professor[] = [
  {
    id: '1',
    nome: 'Professor Silva',
    email: 'professor@blog.com'
  },
  {
    id: '2',
    nome: 'Professor Santos',
    email: 'professor.santos@blog.com'
  }
];

export const alunos: Aluno[] = [
  {
    id: '1',
    nome: 'Aluno Costa',
    email: 'aluno@blog.com'
  },
  {
    id: '2',
    nome: 'Aluno Oliveira',
    email: 'aluno.oliveira@blog.com'
  },
  {
    id: '3',
    nome: 'Aluno Ferreira',
    email: 'aluno.ferreira@blog.com'
  }
];

export const posts: Post[] = [
  {
    id: '1',
    titulo: 'Introdução ao React Native',
    descricao: 'Um guia completo sobre desenvolvimento mobile com React Native',
    conteudo: 'React Native é um framework desenvolvido pelo Facebook que permite criar aplicativos móveis usando JavaScript e React. Ele permite escrever código uma vez e executá-lo tanto em iOS quanto Android.\n\nPrincipais vantagens:\n- Desenvolvimento rápido\n- Reutilização de código\n- Grande comunidade\n- Hot reload para desenvolvimento ágil',
    autor: professores[0],
    dataCriacao: new Date(2024, 0, 15).toISOString()
  },
  {
    id: '2',
    titulo: 'Expo vs React Native CLI',
    descricao: 'Comparação entre as principais ferramentas de desenvolvimento',
    conteudo: 'Ao desenvolver aplicativos React Native, você tem duas opções principais: usar Expo ou React Native CLI.\n\nExpo oferece:\n- Configuração simplificada\n- SDKs prontos para usar\n- Build service na nuvem\n- Mais fácil para iniciantes\n\nReact Native CLI oferece:\n- Mais controle sobre o projeto\n- Acesso a código nativo\n- Flexibilidade total\n- Melhor para projetos complexos',
    autor: professores[1],
    dataCriacao: new Date(2024, 0, 20).toISOString()
  },
  {
    id: '3',
    titulo: 'Navegação em React Native',
    descricao: 'Como implementar navegação eficiente em aplicativos móveis',
    conteudo: 'React Navigation é a biblioteca padrão para navegação em React Native. Ela oferece várias opções:\n\n1. Stack Navigator - Para navegação hierárquica\n2. Tab Navigator - Para navegação por abas\n3. Drawer Navigator - Para menu lateral\n\nCada tipo de navegação tem seu caso de uso específico. É importante escolher a opção certa para melhor experiência do usuário.',
    autor: professores[0],
    dataCriacao: new Date(2024, 0, 25).toISOString()
  },
  {
    id: '4',
    titulo: 'Gerenciamento de Estado com Context API',
    descricao: 'Como gerenciar estado global em aplicações React Native',
    conteudo: 'Context API é uma solução nativa do React para compartilhar estado entre componentes sem precisar passar props manualmente.\n\nPrincipais conceitos:\n- Provider: Componente que fornece o contexto\n- Consumer: Componente que consome o contexto\n- useContext: Hook para acessar o contexto\n\nÉ ideal para estados globais como autenticação, tema e configurações do usuário.',
    autor: professores[1],
    dataCriacao: new Date(2024, 1, 1).toISOString()
  },
  {
    id: '5',
    titulo: 'Boas Práticas de Desenvolvimento Mobile',
    descricao: 'Dicas essenciais para criar aplicativos de qualidade',
    conteudo: 'Ao desenvolver aplicativos móveis, é importante seguir algumas práticas:\n\n1. Performance:\n- Otimize imagens\n- Use FlatList para listas grandes\n- Evite re-renderizações desnecessárias\n\n2. UX/UI:\n- Design responsivo\n- Feedback visual para ações\n- Loading states apropriados\n\n3. Código:\n- Estrutura modular\n- Separação de responsabilidades\n- Testes unitários\n- Documentação clara',
    autor: professores[0],
    dataCriacao: new Date(2024, 1, 5).toISOString()
  }
];
