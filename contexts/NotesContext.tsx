import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export interface Note {
    id: string;
    date: string;
    time: string;
    managerName: string;
    subject: string;
    description: string;
    witnesses: string;
    createdAt: number;
}

const NOTES_STORAGE_KEY = '@10008_notes';

export const [NotesProvider, useNotes] = createContextHook(() => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const stored = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setNotes(parsed);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des notes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveNotes = async (newNotes: Note[]) => {
        try {
            await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(newNotes));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des notes:', error);
        }
    };

    const addNote = async (note: Omit<Note, 'id' | 'createdAt'>) => {
        const newNote: Note = {
            ...note,
            id: Date.now().toString(),
            createdAt: Date.now(),
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);

        return newNote.id;
    };

    const deleteNote = async (id: string) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const updateNote = async (id: string, updates: Omit<Note, 'id' | 'createdAt'>) => {
        const updatedNotes = notes.map(note =>
            note.id === id
                ? { ...note, ...updates }
                : note
        );
        setNotes(updatedNotes);
        await saveNotes(updatedNotes);
    };

    const getNoteById = (id: string): Note | undefined => {
        return notes.find(note => note.id === id);
    };

    return {
        notes,
        isLoading,
        addNote,
        deleteNote,
        updateNote,
        getNoteById,
    };
});
