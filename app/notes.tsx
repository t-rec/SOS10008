import { useNotes } from '@/contexts/NotesContext';
import { Stack, useRouter } from 'expo-router';
import { FileText, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';
import Toast from 'react-native-toast-message';

import { ScreenHeader } from '@/components/ScreenHeader';

export default function NotesListScreen() {
    const router = useRouter();
    const { notes, isLoading, deleteNote } = useNotes();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { formatDate, formatTime } = useDateTimeFormat();

    const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setNoteToDelete(id);
    };

    const confirmDelete = () => {
        if (noteToDelete) {
            deleteNote(noteToDelete);
            setNoteToDelete(null);

            Toast.show({
                type: 'info',
                text1: t('deleteModal.toastTitle'),
                text2: t('deleteModal.toastMessage'),
                position: 'bottom',
            });
        }
    };



    return (
        <View style={[styles.background, { backgroundColor: colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScreenHeader />
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {isLoading ? (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>{t('common.loading')}</Text>
                        </View>
                    ) : notes.length === 0 ? (
                        <View style={styles.emptyState}>
                            <FileText size={48} color={colors.subtitle} strokeWidth={1.5} />
                            <Text style={[styles.emptyTitle, { color: colors.subtitle }]}>{t('notes.emptyTitle')}</Text>
                            <Text style={[styles.emptyText, { color: colors.subtitle }]}>
                                {t('notes.emptyText')}
                            </Text>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.createButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={() => router.push('/new-note')}
                            >
                                <Text style={styles.createButtonText}>{t('notes.createButton')}</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.notesList}>
                            {notes.map((note) => (
                                <Pressable
                                    key={note.id}
                                    style={({ pressed }) => [
                                        styles.noteCard,
                                        { backgroundColor: colors.card, borderColor: colors.border },
                                        pressed && styles.noteCardPressed,
                                    ]}
                                    onPress={() => router.push(`/note/${note.id}`)}
                                >
                                    <View style={styles.noteHeader}>
                                        <Text style={[styles.noteDate, { color: colors.brand }]}>
                                            {formatDate(note.date)} à {formatTime(note.time)}
                                        </Text>
                                        <View onStartShouldSetResponder={() => true}>
                                            <Pressable
                                                onPress={() => handleDelete(note.id)}
                                                hitSlop={10}
                                                style={({ pressed }) => ({
                                                    opacity: pressed ? 0.6 : 1,
                                                })}
                                            >
                                                <Trash2 size={20} color={colors.brand} />
                                            </Pressable>
                                        </View>
                                    </View>
                                    <Text style={[styles.noteSubject, { color: colors.text }]} numberOfLines={2}>
                                        {note.subject}
                                    </Text>
                                    <Text style={[styles.noteManager, { color: colors.subtitle }]}>
                                        {t('common.manager')}: {note.managerName}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </ScrollView>
                {notes.length > 0 && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.fab,
                            pressed && styles.fabPressed,
                        ]}
                        onPress={() => router.push('/new-note')}
                    >
                        <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
                    </Pressable>
                )}
            </SafeAreaView>

            <DeleteConfirmationModal
                visible={!!noteToDelete}
                onCancel={() => setNoteToDelete(null)}
                onConfirm={confirmDelete}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 16,
    },
    emptyTitle: {
        fontSize: 24,
        fontWeight: '900' as const,
        color: '#000000',
        marginTop: 8,
        textTransform: 'uppercase',
    },
    emptyText: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        fontWeight: '500',
    },
    notesList: {
        gap: 20,
    },
    noteCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        padding: 24,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
        gap: 12,
    },
    noteCardPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteDate: {
        fontSize: 16,
        fontWeight: '900' as const,
        color: '#F03F33',
        textTransform: 'uppercase',
    },
    noteSubject: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#000000',
        lineHeight: 26,
    },
    noteManager: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    createButton: {
        backgroundColor: '#F03F33',
        borderRadius: 4,
        padding: 20,
        marginTop: 24,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    createButtonText: {
        fontSize: 20,
        fontWeight: '900' as const,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 4, // Square FAB for brutalist look
        backgroundColor: '#F03F33',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
    },
    fabPressed: {
        transform: [{ translateX: 4 }, { translateY: 4 }],
        shadowOffset: { width: 2, height: 2 },
    },
    buttonPressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
        opacity: 1,
    },
});
