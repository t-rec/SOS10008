import * as Clipboard from 'expo-clipboard';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Copy, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { useNotes } from '@/contexts/NotesContext';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getNoteById, deleteNote } = useNotes();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { formatDate } = useDateTimeFormat();

  // All hooks must be at the top, before any conditional returns
  const [copied, setCopied] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const note = getNoteById(id);



  const handleCopyAll = async () => {
    if (!note) return;

    const fullText = `
${t('noteDetail.copyTemplate.title')}

${t('noteDetail.copyTemplate.date')}: ${formatDate(note.date)}
${t('noteDetail.copyTemplate.time')}: ${note.time}
${t('noteDetail.copyTemplate.manager')}: ${note.managerName}
${t('noteDetail.copyTemplate.subject')}: ${note.subject}

${t('noteDetail.copyTemplate.description')}:
${note.description || 'N/A'}

${t('noteDetail.copyTemplate.witnesses')}:
${note.witnesses || 'N/A'}
    `.trim();

    try {
      await Clipboard.setStringAsync(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      Alert.alert(t('noteDetail.copyErrorTitle'), t('noteDetail.copyErrorText'));
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false);
    await deleteNote(id);

    Toast.show({
      type: 'info',
      text1: t('deleteModal.toastTitle'),
      text2: t('deleteModal.toastMessage'),
      position: 'bottom',
    });

    // Navigate after showing toast
    setTimeout(() => {
      router.back();
    }, 500);
  };

  if (!note) {
    return (
      <View style={[styles.background, { backgroundColor: colors.background }]}>
        <SafeAreaView style={styles.container}>
          <View style={styles.errorState}>
            <Text style={[styles.errorText, { color: colors.subtitle }]}>{t('noteDetail.notFound')}</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.headerRow, { borderBottomColor: colors.secondaryButtonBorder }]}>
              <Text style={[styles.dateText, { color: colors.brand }]}>
                {formatDate(note.date)} à {note.time}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.subtitle }]}>{t('noteDetail.manager')}</Text>
              <Text style={[styles.value, { color: colors.text }]}>{note.managerName}</Text>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.subtitle }]}>{t('noteDetail.subject')}</Text>
              <Text style={[styles.value, { color: colors.text }]}>{note.subject}</Text>
            </View>

            {note.description && (
              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.subtitle }]}>{t('noteDetail.description')}</Text>
                <Text style={[styles.value, { color: colors.text }]}>{note.description}</Text>
              </View>
            )}

            {note.witnesses && (
              <View style={styles.section}>
                <Text style={[styles.label, { color: colors.subtitle }]}>{t('noteDetail.witnesses')}</Text>
                <Text style={[styles.value, { color: colors.text }]}>{note.witnesses}</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.copyButton,
                pressed && styles.buttonPressed,
                copied && styles.copyButtonCopied,
              ]}
              onPress={handleCopyAll}
            >
              {copied ? (
                <Check size={24} color="#059669" strokeWidth={2.5} />
              ) : (
                <Copy size={24} color="#FFFFFF" />
              )}
              <Text style={[styles.copyButtonText, copied && styles.copyButtonTextCopied]}>
                {copied ? t('noteDetail.copiedButton') : t('noteDetail.copyButton')}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
                pressed && styles.buttonPressed,
              ]}
              onPress={handleDelete}
            >
              <Trash2 size={22} color={colors.brand} />
              <Text style={[styles.deleteButtonText, { color: colors.brand }]}>{t('noteDetail.deleteButton')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>

      <DeleteConfirmationModal
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    </View >
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
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 20,
    marginBottom: 24,
  },
  headerRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#FEE2E2',
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#F03F33',
  },
  section: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 17,
    color: '#1F2937',
    lineHeight: 26,
  },
  buttonsContainer: {
    gap: 12,
  },
  copyButton: {
    backgroundColor: '#F03F33',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#F03F33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  copyButtonCopied: {
    backgroundColor: '#10B981',
  },
  copyButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  copyButtonTextCopied: {
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#FEE2E2',
  },
  deleteButtonText: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: '#F03F33',
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
