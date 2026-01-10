export type RootStackParamList = {
  Login: undefined;
  PostsList: undefined;
  PostDetail: { postId: string };
  CreatePost: undefined;
  EditPost: { postId: string };
  AdminPosts: undefined;
  ProfessoresList: undefined;
  CreateProfessor: undefined;
  EditProfessor: { professorId: string };
  AlunosList: undefined;
  CreateAluno: undefined;
  EditAluno: { alunoId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
