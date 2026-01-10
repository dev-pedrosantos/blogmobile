import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getPosts, Post } from '../services/api';

export default function PostsListScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isProfessor } = useAuth();

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
          post.descricao.toLowerCase().includes(searchText.toLowerCase()) ||
          post.autor.nome.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchText, posts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts();
  }, []);

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <Text style={styles.postTitle}>{item.titulo}</Text>
      <Text style={styles.postDescription} numberOfLines={2}>
        {item.descricao}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.postAuthor}>Por: {item.autor.nome}</Text>
        <Text style={styles.postDate}>
          {new Date(item.dataCriacao).toLocaleDateString('pt-BR')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        {isProfessor && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('CreatePost')}
          >
            <Text style={styles.addButtonText}>+ Novo Post</Text>
          </TouchableOpacity>
        )}
      </View>

      {isProfessor && (
        <View style={styles.adminSection}>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('AdminPosts')}
          >
            <Text style={styles.adminButtonText}>Meus Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('ProfessoresList')}
          >
            <Text style={styles.adminButtonText}>Professores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('AlunosList')}
          >
            <Text style={styles.adminButtonText}>Alunos</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar posts..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post encontrado</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  adminSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 8,
  },
  adminButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  listContent: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthor: {
    fontSize: 12,
    color: '#999',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
