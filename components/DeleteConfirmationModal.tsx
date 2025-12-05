import { TriangleAlert } from 'lucide-react-native';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

interface DeleteConfirmationModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function DeleteConfirmationModal({
    visible,
    onCancel,
    onConfirm,
    title,
    message,
}: DeleteConfirmationModalProps) {
    const { t } = useTranslation();

    const modalTitle = title || t('deleteModal.title');
    const modalMessage = message || t('deleteModal.message');
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.centeredView}>
                <Pressable style={styles.backdrop} onPress={onCancel} />
                <View style={styles.modalView}>
                    <View style={styles.iconContainer}>
                        <TriangleAlert size={32} color="#EF4444" />
                    </View>

                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <Text style={styles.modalText}>{modalMessage}</Text>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonCancel]}
                            onPress={onCancel}
                        >
                            <Text style={styles.textStyleCancel}>{t('deleteModal.cancel')}</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonDelete]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.textStyleDelete}>{t('deleteModal.delete')}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalView: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 24,
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 0,
        gap: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 4,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        color: '#000000',
        textTransform: 'uppercase',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000000',
        lineHeight: 26,
        marginBottom: 8,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    buttonCancel: {
        backgroundColor: '#FFFFFF',
    },
    buttonDelete: {
        backgroundColor: '#EF4444',
    },
    textStyleCancel: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    textStyleDelete: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
