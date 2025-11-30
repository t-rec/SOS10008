import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useNotes } from '@/contexts/NotesContext';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useDateTimeFormat } from '@/hooks/useDateTimeFormat';
import { useTheme } from '@/contexts/ThemeContext';

export default function NewNoteScreen() {
    const router = useRouter();
    const { addNote } = useNotes();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { formatDate, formatTime } = useDateTimeFormat();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [managerName, setManagerName] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [witnesses, setWitnesses] = useState<string>('');

    const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (date) {
            const newDate = new Date(selectedDate);
            newDate.setFullYear(date.getFullYear());
            newDate.setMonth(date.getMonth());
            newDate.setDate(date.getDate());
            setSelectedDate(newDate);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, date?: Date) => {
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        if (date) {
            const newDate = new Date(selectedDate);
            newDate.setHours(date.getHours());
            newDate.setMinutes(date.getMinutes());
            setSelectedDate(newDate);
        }
    };

    const [errors, setErrors] = useState<{ managerName?: string; subject?: string }>({});

    const validate = () => {
        const newErrors: { managerName?: string; subject?: string } = {};
        let isValid = true;

        if (!managerName.trim()) {
            newErrors.managerName = t('newNote.errorManager');
            isValid = false;
        }

        if (!subject.trim()) {
            newErrors.subject = t('newNote.errorSubject');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validate()) {
            Toast.show({
                type: 'error',
                text1: t('newNote.toastErrorTitle'),
                text2: t('newNote.toastErrorText'),
                position: 'bottom',
            });
            return;
        }

        try {
            const dateStr = formatDate(selectedDate);
            // Format time as HH:MM
            const timeStr = formatTime(selectedDate);

            await addNote({
                date: dateStr,
                time: timeStr,
                managerName: managerName.trim(),
                subject: subject.trim(),
                description: description.trim(),
                witnesses: witnesses.trim(),
            });

            Toast.show({
                type: 'success',
                text1: t('newNote.toastSuccessTitle'),
                text2: t('newNote.toastSuccessText'),
                position: 'bottom',
            });

            // Navigate back after a short delay to let the user see the success state
            setTimeout(() => {
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.replace('/notes');
                }
            }, 500);

        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            Toast.show({
                type: 'error',
                text1: t('newNote.toastSaveErrorTitle'),
                text2: t('newNote.toastSaveErrorText'),
                position: 'bottom',
            });
        }
    };



    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/notes');
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
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.flex}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                >
                    <ScrollView
                        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <Text style={[styles.header, { color: colors.text }]}>{t('newNote.title')}</Text>

                        <View style={styles.form}>
                            <View style={styles.row}>
                                <View style={styles.halfField}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.date')}</Text>
                                    <Pressable onPress={() => {
                                        setShowDatePicker(!showDatePicker);
                                        setShowTimePicker(false); // Close other picker
                                    }}>
                                        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }, showDatePicker && { borderColor: colors.brand, backgroundColor: colors.background }]}>
                                            <Text style={[styles.inputText, { color: colors.text }]}>
                                                {formatDate(selectedDate)}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>

                                <View style={styles.halfField}>
                                    <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.time')}</Text>
                                    <Pressable onPress={() => {
                                        setShowTimePicker(!showTimePicker);
                                        setShowDatePicker(false); // Close other picker
                                    }}>
                                        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }, showTimePicker && { borderColor: colors.brand, backgroundColor: colors.background }]}>
                                            <Text style={[styles.inputText, { color: colors.text }]}>
                                                {formatTime(selectedDate)}
                                            </Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>

                            {(showDatePicker || showTimePicker) && (
                                <View style={[styles.pickerContainer, { backgroundColor: colors.border }]}>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={selectedDate}
                                            mode="date"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            onChange={onDateChange}
                                            style={styles.datePicker}
                                            themeVariant={colors.background === '#111827' ? 'dark' : 'light'}
                                        />
                                    )}
                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={selectedDate}
                                            mode="time"
                                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                            is24Hour={true}
                                            onChange={onTimeChange}
                                            style={styles.datePicker}
                                            themeVariant={colors.background === '#111827' ? 'dark' : 'light'}
                                        />
                                    )}
                                </View>
                            )}

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.managerLabel')}</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, errors.managerName && styles.inputError]}
                                    value={managerName}
                                    onChangeText={(text) => {
                                        setManagerName(text);
                                        if (errors.managerName) {
                                            setErrors({ ...errors, managerName: undefined });
                                        }
                                    }}
                                    placeholder={t('newNote.managerPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                />
                                {errors.managerName && (
                                    <Text style={styles.errorText}>{errors.managerName}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.subjectLabel')}</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }, errors.subject && styles.inputError]}
                                    value={subject}
                                    onChangeText={(text) => {
                                        setSubject(text);
                                        if (errors.subject) {
                                            setErrors({ ...errors, subject: undefined });
                                        }
                                    }}
                                    placeholder={t('newNote.subjectPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                />
                                {errors.subject && (
                                    <Text style={styles.errorText}>{errors.subject}</Text>
                                )}
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.descriptionLabel')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder={t('newNote.descriptionPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                    multiline
                                    numberOfLines={6}
                                    textAlignVertical="top"
                                />
                            </View>

                            <View style={styles.field}>
                                <Text style={[styles.label, { color: colors.subtitle }]}>{t('newNote.witnessesLabel')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
                                    value={witnesses}
                                    onChangeText={setWitnesses}
                                    placeholder={t('newNote.witnessesPlaceholder')}
                                    placeholderTextColor={colors.subtitle}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.saveButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveButtonText}>{t('newNote.saveButton')}</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.cancelButton,
                                    { backgroundColor: colors.secondaryButton, borderColor: colors.secondaryButtonBorder },
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleBack}
                            >
                                <Text style={[styles.cancelButtonText, { color: colors.secondaryButtonText }]}>{t('newNote.cancelButton')}</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
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
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    header: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#1F2937',
        marginBottom: 24,
    },
    form: {
        gap: 20,
        marginBottom: 32,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfField: {
        flex: 1,
    },
    field: {
        gap: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    inputError: {
        borderColor: '#EF4444',
        backgroundColor: '#FEF2F2',
    },
    errorText: {
        fontSize: 14,
        color: '#EF4444',
        marginTop: 4,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
    },
    inputText: {
        fontSize: 16,
        color: '#1F2937',
    },
    textArea: {
        minHeight: 120,
        paddingTop: 16,
    },
    buttonsContainer: {
        gap: 12,
        marginTop: 'auto' as const,
    },
    saveButton: {
        backgroundColor: '#F03F33',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#F03F33',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    saveButtonText: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#FFFFFF',
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#6B7280',
    },
    inputActive: {
        borderColor: '#F03F33',
        backgroundColor: '#FEF2F2',
    },
    datePicker: {
        alignSelf: 'center',
    },
    pickerContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: -8,
        alignItems: 'center',
        paddingVertical: 12,
    },
    buttonPressed: {
        opacity: 0.7,
    },
});
