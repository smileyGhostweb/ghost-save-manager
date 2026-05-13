import { create } from 'zustand';

export interface GameSave {
  id: string;
  name: string;
  gameName: string;
  format: 'json' | 'xml' | 'binary' | 'zip';
  size: number;
  createdAt: string;
  updatedAt: string;
  fileUrl: string;
  backupCount: number;
  userId: string;
}

interface SaveStore {
  saves: GameSave[];
  currentSave: GameSave | null;
  isLoading: boolean;
  error: string | null;
  fetchSaves: () => Promise<void>;
  fetchSave: (id: string) => Promise<void>;
  uploadSave: (file: File, gameName: string) => Promise<boolean>;
  deleteSave: (id: string) => Promise<boolean>;
  createBackup: (saveId: string) => Promise<boolean>;
  restoreBackup: (saveId: string, backupId: string) => Promise<boolean>;
}

export const useSaveStore = create<SaveStore>((set, get) => ({
  saves: [],
  currentSave: null,
  isLoading: false,
  error: null,

  fetchSaves: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/saves', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch saves');
      const data = await response.json();
      set({ saves: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchSave: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/saves/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch save');
      const data = await response.json();
      set({ currentSave: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  uploadSave: async (file: File, gameName: string) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('gameName', gameName);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/saves/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      const newSave = await response.json();
      const saves = get().saves;
      set({ saves: [newSave, ...saves], isLoading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  deleteSave: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/saves/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Delete failed');
      const saves = get().saves.filter((s) => s.id !== id);
      set({ saves, isLoading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  createBackup: async (saveId: string) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/saves/${saveId}/backup`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Backup failed');
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  restoreBackup: async (saveId: string, backupId: string) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/saves/${saveId}/restore/${backupId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Restore failed');
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },
}));
