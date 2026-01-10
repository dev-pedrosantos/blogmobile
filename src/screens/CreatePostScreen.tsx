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
import { createPost, getProfessores } from '../services/api';

export default function CreatePostScreen({ navigation }: any) {
  const { usuario, isProfessor } = useAuth();
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isProfessor) {
      Alert.alert('Acesso Negado', 'Apenas professores podem criar posts', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [isProfessor, navigation]);

  const handleSave = async () => {
    if (!isProfessor) {
      Alert.alert('Acesso Negado', 'Apenas professores podem criar posts');
      return;
    }

    if (!titulo.trim() || !descricao.trim() || !conteudo.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (!usuario) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

    setLoading(true);
    try {
      const professoresResult = await getProfessores(1, 100);
      const autor = professoresResult.data.find(p => p.email === usuario.email);
      
      if (!autor) {
        Alert.alert('Erro', 'Autor não encontrado');
        return;
      }

      await createPost({
        titulo,
        descricao,
        conteudo,
        autor,
      });
      Alert.alert('Sucesso', 'Post criado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error('Erro ao criar post:', error);
      Alert.alert('Erro', 'Não foi possível criar o post');
    } finally {
      setLoading(false);
    }
  };

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
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar Post</Text>
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
