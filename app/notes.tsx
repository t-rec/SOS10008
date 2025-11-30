import { useNotes } from '@/contexts/NotesContext';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, FileText, Plus, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';
import Toast from 'react-native-toast-message';

export default function NotesListScreen() {
    const router = useRouter();
    const { notes, isLoading, deleteNote } = useNotes();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { formatDate } = useDateTimeFormat();

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
            <Stack.Screen
                options={{
                    title: t('common.back'),
                    headerStyle: { backgroundColor: '#F03F33' },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: { fontWeight: '700' as const },
                }}
            />
            <SafeAreaView style={styles.container} edges={['bottom']}>
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
                                            {formatDate(note.date)} à {note.time}
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
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600' as const,
        color: '#6B7280',
        marginTop: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    notesList: {
        gap: 16,
    },
    noteCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        gap: 10,
    },
    noteCardPressed: {
        opacity: 0.7,
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteDate: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#F03F33',
    },
    noteSubject: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#1F2937',
        lineHeight: 24,
    },
    noteManager: {
        fontSize: 15,
        color: '#6B7280',
    },
    createButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 18,
        marginTop: 24,
        alignItems: 'center',
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    createButtonText: {
        fontSize: 17,
        fontWeight: '700' as const,
        color: '#FFFFFF',
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F03F33',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
    },
    fabPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.95 }],
    },
    buttonPressed: {
        opacity: 0.7,
    },
});
