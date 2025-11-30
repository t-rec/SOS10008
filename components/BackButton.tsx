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
            <ChevronLeft color="#000000" size={24} strokeWidth={2.5} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFCDD2', // Light red/pink to match the image
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8, // Add some margin from the edge
        marginRight: 16, // Add space between button and title
    },
    pressed: {
        opacity: 0.7,
    },
});
