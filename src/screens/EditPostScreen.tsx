import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getPostById, updatePost } from '../services/api';
import { Post } from '../services/mockData';

export default function EditPostScreen({ navigation, route }: any) {
  const { postId } = route.params;
  const { usuario } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      const data = await getPostById(postId);
      if (data) {
        setPost(data);
        setTitulo(data.titulo);
        setDescricao(data.descricao);
        setConteudo(data.conteudo);
      }
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      Alert.alert('Erro', 'Não foi possível carregar o post');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!titulo.trim() || !descricao.trim() || !conteudo.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (post && post.autor.email !== usuario?.email) {
      Alert.alert('Erro', 'Você não tem permissão para editar este post');
      return;
    }

    setSaving(true);
    try {
      await updatePost(postId, {
        titulo,
        descricao,
        conteudo,
      });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Título *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título do post"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite uma breve descrição"
          value={descricao}
          onChangeText={setDescricao}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Conteúdo *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite o conteúdo completo do post"
          value={conteudo}
          onChangeText={setConteudo}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
