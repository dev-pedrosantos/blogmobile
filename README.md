# Blog Mobile

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.31-000020?logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Sistema mobile desenvolvido com React Native e Expo para gerenciamento de conteúdo educacional, implementando controle de acesso baseado em roles (professor/aluno) e operações CRUD completas para posts, professores e alunos.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [API e Integração](#-api-e-integração)
- [Segurança e Permissões](#-segurança-e-permissões)
- [Troubleshooting](#-troubleshooting)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

Blog Mobile é uma aplicação educacional multiplataforma que oferece um sistema completo de gerenciamento de conteúdo acadêmico. A solução implementa um modelo de permissões baseado em roles, onde professores possuem acesso administrativo completo para criação, edição e exclusão de posts, enquanto alunos têm acesso restrito apenas à visualização de conteúdo.

### Características Principais

- **Autenticação e Autorização**: Sistema robusto de autenticação com Context API e controle granular de permissões
- **Gerenciamento de Conteúdo**: CRUD completo para posts educacionais com busca e filtros em tempo real
- **Administração de Usuários**: Interface administrativa para gerenciamento de professores e alunos
- **Arquitetura Modular**: Código organizado seguindo princípios SOLID e separação de responsabilidades
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade do código
- **Pronto para Produção**: Estrutura preparada para integração com APIs REST reais

## 🚀 Tecnologias

### Core
- **React Native 0.81.5** - Framework para desenvolvimento mobile multiplataforma
- **Expo ~54.0.31** - Plataforma e ferramentas para desenvolvimento React Native
- **TypeScript 5.9.2** - Superset JavaScript com tipagem estática

### Navegação e Estado
- **React Navigation 7.x** - Sistema de navegação nativo (Native Stack Navigator)
- **Context API** - Gerenciamento de estado global para autenticação
- **React Hooks** - Gerenciamento de estado local e ciclo de vida

### Desenvolvimento
- **Expo CLI** - Ferramentas de desenvolvimento e build
- **ESLint** - Linter para qualidade de código
- **Git** - Controle de versão

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Screens, Components, Navigation)  │
└──────────────┬───────────────────────┘
               │
┌──────────────▼───────────────────────┐
│         Business Logic Layer         │
│      (Contexts, Custom Hooks)        │
└──────────────┬───────────────────────┘
               │
┌──────────────▼───────────────────────┐
│          Data Access Layer           │
│      (Services, API Integration)     │
└───────────────────────────────────────┘
```

### Princípios de Design

- **Separação de Responsabilidades**: Cada módulo possui uma responsabilidade única e bem definida
- **Inversão de Dependências**: Camadas superiores dependem de abstrações, não de implementações
- **Reutilização de Código**: Componentes e utilitários são projetados para máxima reutilização
- **Testabilidade**: Estrutura modular facilita testes unitários e de integração

## 📋 Pré-requisitos

Antes de iniciar a instalação, certifique-se de possuir os seguintes requisitos:

### Software Necessário

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** >= 2.30.0 ([Download](https://git-scm.com/))
- **Expo CLI** ([Instalação](https://docs.expo.dev/get-started/installation/))

### Para Desenvolvimento Android

- **Android Studio** ([Download](https://developer.android.com/studio))
- **Android SDK** (instalado via Android Studio)
- **Emulador Android** ou dispositivo físico com modo desenvolvedor ativado

### Para Desenvolvimento iOS (Opcional)

- **Xcode** >= 14.0 (apenas macOS)
- **CocoaPods** >= 1.11.0

## 🛠️ Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/dev-pedrosantos/blogmobile.git
cd blogmobile
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npx expo start
```

### 4. Executar no Dispositivo/Emulador

**Android:**
```bash
# Certifique-se de que o emulador está rodando
npx expo start --android
# Ou pressione 'a' no terminal do Expo
```

**iOS (apenas macOS):**
```bash
npx expo start --ios
# Ou pressione 'i' no terminal do Expo
```

## ⚙️ Configuração

### Variáveis de Ambiente

O projeto utiliza dados mockados por padrão. Para configurar uma API real, edite `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://api.exemplo.com';
const USE_MOCK = false;
```

### Credenciais de Acesso

O sistema inclui usuários de demonstração pré-configurados:

| Tipo | Email | Senha |
|------|-------|-------|
| Professor | `professor@blog.com` | `123456` |
| Aluno | `aluno@blog.com` | `123456` |

## 📖 Uso

### Fluxo de Autenticação

1. Inicie o aplicativo
2. Faça login com uma das credenciais acima
3. O sistema redirecionará automaticamente baseado no tipo de usuário

### Funcionalidades por Perfil

**Professor:**
- Acesso completo ao sistema
- Criação, edição e exclusão de posts
- Gerenciamento de professores e alunos
- Visualização de todos os posts

**Aluno:**
- Visualização de posts
- Busca e filtros
- Acesso bloqueado a funcionalidades administrativas

## 📁 Estrutura do Projeto

```
blogmobile/
├── src/
│   ├── screens/                    # Camada de apresentação
│   │   ├── LoginScreen.tsx         # Tela de autenticação
│   │   ├── PostsListScreen.tsx     # Listagem de posts
│   │   ├── PostDetailScreen.tsx    # Detalhes do post
│   │   ├── CreatePostScreen.tsx    # Criação de post
│   │   ├── EditPostScreen.tsx      # Edição de post
│   │   ├── AdminPostsScreen.tsx    # Painel administrativo
│   │   ├── Professores/            # Módulo de professores
│   │   │   ├── ProfessoresListScreen.tsx
│   │   │   ├── CreateProfessorScreen.tsx
│   │   │   └── EditProfessorScreen.tsx
│   │   └── Alunos/                 # Módulo de alunos
│   │       ├── AlunosListScreen.tsx
│   │       ├── CreateAlunoScreen.tsx
│   │       └── EditAlunoScreen.tsx
│   ├── components/                 # Componentes reutilizáveis
│   ├── services/                   # Camada de serviços
│   │   ├── api.ts                  # Integração com API
│   │   └── mockData.ts             # Dados mockados
│   ├── contexts/                   # Contextos React
│   │   └── AuthContext.tsx         # Contexto de autenticação
│   └── navigation/                 # Configuração de navegação
│       ├── AppNavigator.tsx        # Navegador principal
│       └── types.ts                # Tipos TypeScript
├── App.tsx                         # Componente raiz
├── index.js                        # Ponto de entrada
├── app.json                        # Configurações Expo
└── package.json                     # Dependências
```

## 🎯 Funcionalidades

### Sistema de Autenticação

- Autenticação baseada em email e senha
- Gerenciamento de sessão com Context API
- Redirecionamento automático baseado em role
- Proteção de rotas no nível de navegação

### Gerenciamento de Posts

**Listagem:**
- Visualização paginada de posts
- Busca em tempo real (título, descrição, autor)
- Pull-to-refresh para atualização
- Cards informativos com metadados

**Operações CRUD:**
- Criação com validação de formulário
- Edição com pré-preenchimento
- Exclusão com confirmação
- Visualização completa de conteúdo

### Administração de Usuários

**Professores:**
- Listagem paginada
- Criação, edição e exclusão
- Validação de dados de entrada

**Alunos:**
- Listagem paginada
- Criação, edição e exclusão
- Validação de dados de entrada

### Interface do Usuário

- Design moderno e responsivo
- Feedback visual para todas as ações
- Estados de carregamento
- Tratamento de erros com mensagens amigáveis
- Animações suaves e transições

## 🔌 API e Integração

### Estrutura de API

O sistema está preparado para integração com APIs RESTful. A interface está definida em `src/services/api.ts` e suporta os seguintes endpoints:

#### Autenticação
```
POST   /auth/login
```

#### Posts
```
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

#### Professores
```
GET    /professores?page=1&limit=10
POST   /professores
PUT    /professores/:id
DELETE /professores/:id
```

#### Alunos
```
GET    /alunos?page=1&limit=10
POST   /alunos
PUT    /alunos/:id
DELETE /alunos/:id
```

### Modo Mock

Por padrão, o sistema utiliza dados mockados armazenados em memória. Para ativar a integração com API real, configure `USE_MOCK = false` em `src/services/api.ts`.

## 🔒 Segurança e Permissões

### Modelo de Controle de Acesso

O sistema implementa um modelo RBAC (Role-Based Access Control) com dois níveis:

**Nível 1 - Navegação:**
- Rotas administrativas são registradas condicionalmente baseadas no tipo de usuário
- Alunos não possuem acesso às rotas de gerenciamento

**Nível 2 - Validação:**
- Verificações adicionais em componentes sensíveis
- Validação de propriedade (apenas o autor pode editar/excluir seus posts)

### Implementação

```typescript
// Exemplo de proteção de rota
{isProfessor && (
  <Stack.Screen name="AdminPosts" component={AdminPostsScreen} />
)}
```

## 🐛 Troubleshooting

### Problemas Comuns

**Erro ao iniciar o servidor:**
```bash
npx expo start --clear
```

**Problemas com cache:**
```bash
npm start -- --reset-cache
```

**Erro no emulador Android:**
- Verifique se o Android Studio está rodando
- Certifique-se de que o emulador está ativo
- Verifique se as variáveis de ambiente ANDROID_HOME estão configuradas

**Erro de dependências:**
```bash
rm -rf node_modules
npm install
```

## 📸 Demonstração

> **⚠️ Nota Importante sobre Demonstração em Vídeo**
> 
> Infelizmente, não foi possível criar uma demonstração em vídeo deste projeto devido a limitações de hardware tanto no computador quanto no dispositivo móvel disponíveis. O computador utilizado não possui recursos suficientes para gravar a tela enquanto executa o emulador Android, e o dispositivo móvel disponível não atende aos requisitos mínimos para captura de tela de qualidade.
> 
> No entanto, o projeto está completamente funcional e pode ser testado seguindo as instruções de instalação acima. Todas as funcionalidades descritas neste README foram implementadas e testadas. Para uma experiência completa, recomenda-se executar o projeto localmente ou em um dispositivo/emulador com recursos adequados.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Siga os padrões de código TypeScript/React Native
- Mantenha a estrutura de pastas existente
- Adicione comentários quando necessário
- Escreva commits descritivos

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Pedro Santos**

- GitHub: [@dev-pedrosantos](https://github.com/dev-pedrosantos)
- Email: pedrostdev@gmail.com

## 🙏 Agradecimentos

- [React Native Community](https://reactnative.dev/)
- [Expo Team](https://expo.dev/)
- [React Navigation](https://reactnavigation.org/)

---

**Desenvolvido com ❤️ usando React Native e Expo**

*Este projeto foi desenvolvido para fins educacionais e demonstração de conceitos avançados de desenvolvimento mobile com React Native.*
