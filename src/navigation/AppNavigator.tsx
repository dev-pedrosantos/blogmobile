import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import PostsListScreen from '../screens/PostsListScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import EditPostScreen from '../screens/EditPostScreen';
import AdminPostsScreen from '../screens/AdminPostsScreen';
import ProfessoresListScreen from '../screens/Professores/ProfessoresListScreen';
import CreateProfessorScreen from '../screens/Professores/CreateProfessorScreen';
import EditProfessorScreen from '../screens/Professores/EditProfessorScreen';
import AlunosListScreen from '../screens/Alunos/AlunosListScreen';
import CreateAlunoScreen from '../screens/Alunos/CreateAlunoScreen';
import EditAlunoScreen from '../screens/Alunos/EditAlunoScreen';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isProfessor, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="PostsList"
          component={PostsListScreen}
          options={{
            title: 'Posts',
            headerRight: () => (
              <TouchableOpacity
                onPress={logout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetailScreen}
          options={{ title: 'Detalhes do Post' }}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePostScreen}
          options={{ title: 'Novo Post' }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPostScreen}
          options={{ title: 'Editar Post' }}
        />
        {isProfessor && (
          <>
            <Stack.Screen
              name="AdminPosts"
              component={AdminPostsScreen}
              options={{ title: 'Meus Posts' }}
            />
            <Stack.Screen
              name="ProfessoresList"
              component={ProfessoresListScreen}
              options={{ title: 'Professores' }}
            />
            <Stack.Screen
              name="CreateProfessor"
              component={CreateProfessorScreen}
              options={{ title: 'Novo Professor' }}
            />
            <Stack.Screen
              name="EditProfessor"
              component={EditProfessorScreen}
              options={{ title: 'Editar Professor' }}
            />
            <Stack.Screen
              name="AlunosList"
              component={AlunosListScreen}
              options={{ title: 'Alunos' }}
            />
            <Stack.Screen
              name="CreateAluno"
              component={CreateAlunoScreen}
              options={{ title: 'Novo Aluno' }}
            />
            <Stack.Screen
              name="EditAluno"
              component={EditAlunoScreen}
              options={{ title: 'Editar Aluno' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
