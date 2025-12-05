import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, StyleSheet } from 'react-native';

export default function BackButton() {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => {
                if (router.canGoBack()) {
                    router.back();
                } else {
                    router.replace('/');
                }
            }}
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
        >
            <ChevronLeft color="#000000" size={28} strokeWidth={3} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        marginRight: 16,
        borderWidth: 3,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    pressed: {
        transform: [{ translateX: 2 }, { translateY: 2 }],
        shadowOffset: { width: 2, height: 2 },
    },
});
