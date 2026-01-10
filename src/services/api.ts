import { Usuario, Professor, Aluno, Post, usuarios, professores, alunos, posts } from './mockData';

const API_BASE_URL = 'https://api.blogmobile.com';
const USE_MOCK = true;

let postsData = [...posts];
let professoresData = [...professores];
let alunosData = [...alunos];

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (USE_MOCK) {
    throw new Error('Using mock data');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function login(email: string, senha: string): Promise<Usuario | null> {
  if (USE_MOCK) {
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    return usuario || null;
  }

  try {
    const usuario = await fetchAPI<Usuario>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    return usuario;
  } catch (error) {
    console.error('Login error:', error);
    return usuarios.find(u => u.email === email && u.senha === senha) || null;
  }
}

export async function getPosts(): Promise<Post[]> {
  if (USE_MOCK) {
    return postsData;
  }

  try {
    return await fetchAPI<Post[]>('/posts');
  } catch (error) {
    console.error('Get posts error:', error);
    return postsData;
  }
}

export async function getPostById(id: string): Promise<Post | null> {
  if (USE_MOCK) {
    return postsData.find(p => p.id === id) || null;
  }

  try {
    return await fetchAPI<Post>(`/posts/${id}`);
  } catch (error) {
    console.error('Get post error:', error);
    return postsData.find(p => p.id === id) || null;
  }
}

export async function createPost(post: Omit<Post, 'id' | 'dataCriacao'>): Promise<Post> {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    dataCriacao: new Date().toISOString(),
  };

  if (USE_MOCK) {
    postsData.push(newPost);
    return newPost;
  }

  try {
    return await fetchAPI<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  } catch (error) {
    console.error('Create post error:', error);
    postsData.push(newPost);
    return newPost;
  }
}

export async function updatePost(id: string, post: Partial<Post>): Promise<Post> {
  if (USE_MOCK) {
    const index = postsData.findIndex(p => p.id === id);
    if (index !== -1) {
      postsData[index] = { ...postsData[index], ...post };
      return postsData[index];
    }
    throw new Error('Post not found');
  }

  try {
    return await fetchAPI<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  } catch (error) {
    console.error('Update post error:', error);
    const index = postsData.findIndex(p => p.id === id);
    if (index !== -1) {
      postsData[index] = { ...postsData[index], ...post };
      return postsData[index];
    }
    throw error;
  }
}

export async function deletePost(id: string): Promise<boolean> {
  if (USE_MOCK) {
    const index = postsData.findIndex(p => p.id === id);
    if (index !== -1) {
      postsData.splice(index, 1);
      return true;
    }
    return false;
  }

  try {
    await fetchAPI(`/posts/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Delete post error:', error);
    const index = postsData.findIndex(p => p.id === id);
    if (index !== -1) {
      postsData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export async function getProfessores(page: number = 1, limit: number = 10): Promise<{ data: Professor[]; total: number }> {
  if (USE_MOCK) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: professoresData.slice(start, end),
      total: professoresData.length,
    };
  }

  try {
    return await fetchAPI<{ data: Professor[]; total: number }>(`/professores?page=${page}&limit=${limit}`);
  } catch (error) {
    console.error('Get professores error:', error);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: professoresData.slice(start, end),
      total: professoresData.length,
    };
  }
}

export async function createProfessor(professor: Omit<Professor, 'id'>): Promise<Professor> {
  const newProfessor: Professor = {
    ...professor,
    id: Date.now().toString(),
  };

  if (USE_MOCK) {
    professoresData.push(newProfessor);
    return newProfessor;
  }

  try {
    return await fetchAPI<Professor>('/professores', {
      method: 'POST',
      body: JSON.stringify(professor),
    });
  } catch (error) {
    console.error('Create professor error:', error);
    professoresData.push(newProfessor);
    return newProfessor;
  }
}

export async function updateProfessor(id: string, professor: Partial<Professor>): Promise<Professor> {
  if (USE_MOCK) {
    const index = professoresData.findIndex(p => p.id === id);
    if (index !== -1) {
      professoresData[index] = { ...professoresData[index], ...professor };
      return professoresData[index];
    }
    throw new Error('Professor not found');
  }

  try {
    return await fetchAPI<Professor>(`/professores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(professor),
    });
  } catch (error) {
    console.error('Update professor error:', error);
    const index = professoresData.findIndex(p => p.id === id);
    if (index !== -1) {
      professoresData[index] = { ...professoresData[index], ...professor };
      return professoresData[index];
    }
    throw error;
  }
}

export async function deleteProfessor(id: string): Promise<boolean> {
  if (USE_MOCK) {
    const index = professoresData.findIndex(p => p.id === id);
    if (index !== -1) {
      professoresData.splice(index, 1);
      return true;
    }
    return false;
  }

  try {
    await fetchAPI(`/professores/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Delete professor error:', error);
    const index = professoresData.findIndex(p => p.id === id);
    if (index !== -1) {
      professoresData.splice(index, 1);
      return true;
    }
    return false;
  }
}

export async function getAlunos(page: number = 1, limit: number = 10): Promise<{ data: Aluno[]; total: number }> {
  if (USE_MOCK) {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: alunosData.slice(start, end),
      total: alunosData.length,
    };
  }

  try {
    return await fetchAPI<{ data: Aluno[]; total: number }>(`/alunos?page=${page}&limit=${limit}`);
  } catch (error) {
    console.error('Get alunos error:', error);
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      data: alunosData.slice(start, end),
      total: alunosData.length,
    };
  }
}

export async function createAluno(aluno: Omit<Aluno, 'id'>): Promise<Aluno> {
  const newAluno: Aluno = {
    ...aluno,
    id: Date.now().toString(),
  };

  if (USE_MOCK) {
    alunosData.push(newAluno);
    return newAluno;
  }

  try {
    return await fetchAPI<Aluno>('/alunos', {
      method: 'POST',
      body: JSON.stringify(aluno),
    });
  } catch (error) {
    console.error('Create aluno error:', error);
    alunosData.push(newAluno);
    return newAluno;
  }
}

export async function updateAluno(id: string, aluno: Partial<Aluno>): Promise<Aluno> {
  if (USE_MOCK) {
    const index = alunosData.findIndex(a => a.id === id);
    if (index !== -1) {
      alunosData[index] = { ...alunosData[index], ...aluno };
      return alunosData[index];
    }
    throw new Error('Aluno not found');
  }

  try {
    return await fetchAPI<Aluno>(`/alunos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(aluno),
    });
  } catch (error) {
    console.error('Update aluno error:', error);
    const index = alunosData.findIndex(a => a.id === id);
    if (index !== -1) {
      alunosData[index] = { ...alunosData[index], ...aluno };
      return alunosData[index];
    }
    throw error;
  }
}

export async function deleteAluno(id: string): Promise<boolean> {
  if (USE_MOCK) {
    const index = alunosData.findIndex(a => a.id === id);
    if (index !== -1) {
      alunosData.splice(index, 1);
      return true;
    }
    return false;
  }

  try {
    await fetchAPI(`/alunos/${id}`, {
      method: 'DELETE',
    });
    return true;
  } catch (error) {
    console.error('Delete aluno error:', error);
    const index = alunosData.findIndex(a => a.id === id);
    if (index !== -1) {
      alunosData.splice(index, 1);
      return true;
    }
    return false;
  }
}
