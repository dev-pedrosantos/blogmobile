# Blog Mobile

Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de posts educacionais, com sistema de autenticação e controle de permissões diferenciado para professores e alunos.

## 📱 Sobre o Projeto

O Blog Mobile é uma aplicação educacional que permite que professores criem e gerenciem posts educacionais, enquanto alunos têm acesso apenas à visualização. O sistema inclui gerenciamento completo de professores e alunos, além de um sistema robusto de posts com busca e filtros.

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação
- **React Navigation** - Navegação entre telas (Native Stack)
- **Context API** - Gerenciamento de estado global (autenticação)
- **React Hooks** - Gerenciamento de estado e ciclo de vida

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (para emulador Android)
- [Git](https://git-scm.com/)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/blogmobile.git
cd blogmobile
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor Expo:
```bash
npx expo start
```

4. Para executar no emulador Android:
   - Certifique-se de que o emulador Android está rodando
   - Pressione `a` no terminal do Expo para abrir no Android

## 📁 Estrutura do Projeto

```
blogmobile/
├── src/
│   ├── screens/              # Telas da aplicação
│   │   ├── LoginScreen.tsx
│   │   ├── PostsListScreen.tsx
│   │   ├── PostDetailScreen.tsx
│   │   ├── CreatePostScreen.tsx
│   │   ├── EditPostScreen.tsx
│   │   ├── AdminPostsScreen.tsx
│   │   ├── Professores/
│   │   │   ├── ProfessoresListScreen.tsx
│   │   │   ├── CreateProfessorScreen.tsx
│   │   │   └── EditProfessorScreen.tsx
│   │   └── Alunos/
│   │       ├── AlunosListScreen.tsx
│   │       ├── CreateAlunoScreen.tsx
│   │       └── EditAlunoScreen.tsx
│   ├── components/           # Componentes reutilizáveis
│   ├── services/             # Serviços de API e dados mockados
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── contexts/             # Contextos React
│   │   └── AuthContext.tsx
│   └── navigation/           # Configuração de navegação
│       ├── AppNavigator.tsx
│       └── types.ts
├── App.tsx                   # Componente raiz da aplicação
├── index.js                  # Ponto de entrada da aplicação
├── app.json                  # Configurações do Expo
└── package.json              # Dependências do projeto
```

## 👥 Usuários do Sistema

### Credenciais de Acesso

**Professor:**
- Email: `professor@blog.com`
- Senha: `123456`

**Aluno:**
- Email: `aluno@blog.com`
- Senha: `123456`

## 🔐 Sistema de Autenticação

O sistema utiliza Context API para gerenciar o estado de autenticação globalmente. O `AuthContext` fornece:

- Estado do usuário autenticado
- Tipo de usuário (professor ou aluno)
- Funções de login e logout
- Verificações de permissão (isProfessor, isAluno)

## 🎯 Funcionalidades

### Para Professores

- ✅ Login e autenticação
- ✅ Visualização de todos os posts
- ✅ Busca e filtro de posts
- ✅ Criação de novos posts
- ✅ Edição de posts próprios
- ✅ Exclusão de posts próprios
- ✅ Gerenciamento de posts (página administrativa)
- ✅ Gerenciamento completo de professores (CRUD)
- ✅ Gerenciamento completo de alunos (CRUD)
- ✅ Listagem paginada de professores e alunos

### Para Alunos

- ✅ Login e autenticação
- ✅ Visualização de todos os posts
- ✅ Busca e filtro de posts
- ✅ Leitura completa dos posts
- ❌ Bloqueio de todas as telas administrativas

## 📝 Gerenciamento de Posts

### Listagem de Posts
- Visualização de todos os posts disponíveis
- Busca em tempo real por título, descrição ou autor
- Pull-to-refresh para atualizar a lista
- Cards informativos com título, descrição e autor

### Detalhes do Post
- Visualização completa do conteúdo
- Informações do autor e data de criação
- Botões de edição e exclusão (apenas para o autor professor)

### Criação e Edição
- Formulário completo com validação
- Campos: Título, Descrição e Conteúdo
- Associação automática com o professor logado

## 👨‍🏫 Gerenciamento de Professores

- Listagem paginada de professores
- Criação de novos professores
- Edição de dados de professores
- Exclusão de professores
- Campos: Nome e Email

## 👨‍🎓 Gerenciamento de Alunos

- Listagem paginada de alunos
- Criação de novos alunos
- Edição de dados de alunos
- Exclusão de alunos
- Campos: Nome e Email

## 🔌 Integração com API

O sistema está preparado para integração com API REST. Atualmente utiliza dados mockados para desenvolvimento e testes.

### Configuração da API

Para conectar a uma API real, edite o arquivo `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://sua-api.com';
const USE_MOCK = false;
```

A interface da API está definida e pronta para receber os seguintes endpoints:

- `POST /auth/login` - Autenticação
- `GET /posts` - Listar posts
- `GET /posts/:id` - Buscar post por ID
- `POST /posts` - Criar post
- `PUT /posts/:id` - Atualizar post
- `DELETE /posts/:id` - Excluir post
- `GET /professores?page=1&limit=10` - Listar professores
- `POST /professores` - Criar professor
- `PUT /professores/:id` - Atualizar professor
- `DELETE /professores/:id` - Excluir professor
- `GET /alunos?page=1&limit=10` - Listar alunos
- `POST /alunos` - Criar aluno
- `PUT /alunos/:id` - Atualizar aluno
- `DELETE /alunos/:id` - Excluir aluno

## 🔒 Controle de Permissões

O sistema implementa controle rigoroso de permissões:

- **Professores**: Acesso total a todas as funcionalidades
- **Alunos**: Acesso apenas à visualização de posts
- Navegação condicional baseada no tipo de usuário
- Proteção de rotas no nível de navegação
- Validação adicional nas telas sensíveis

## 🎨 Interface do Usuário

- Design moderno e responsivo
- Cores e estilos consistentes
- Feedback visual para todas as ações
- Estados de carregamento
- Mensagens de erro amigáveis
- Animações suaves

## 📱 Navegação

O aplicativo utiliza React Navigation com Native Stack Navigator:

- Navegação hierárquica entre telas
- Headers personalizados
- Botão de logout na tela principal
- Navegação condicional baseada em autenticação
- Proteção de rotas administrativas

## 🧪 Dados Iniciais

O sistema vem pré-configurado com dados de demonstração:

- 2 usuários (1 professor, 1 aluno)
- 2 professores
- 3 alunos
- 5 posts educacionais completos

Todos os dados são carregados automaticamente ao iniciar o aplicativo.

## 🐛 Solução de Problemas

### Erro ao iniciar o servidor

```bash
npx expo start --clear
```

### Problemas com cache

```bash
npm start -- --reset-cache
```

### Erro no emulador Android

Certifique-se de que o Android Studio está rodando e o emulador está ativo antes de pressionar `a`.

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando React Native e Expo.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

**Nota**: Este projeto foi desenvolvido para fins educacionais e demonstração de conceitos de desenvolvimento mobile com React Native.
