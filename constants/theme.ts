import { StyleSheet } from 'react-native';

export const BrutalistTheme = {
    border: {
        width: 3,
        radius: 4, // Minimal rounding
    },
    shadow: {
        light: {
            shadowColor: '#000000',
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 8,
        },
        dark: {
            shadowColor: '#F03F33', // Brand color shadow for dark mode visibility
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 8,
        },
    },
    typography: {
        weights: {
            regular: '500', // Medium is the new regular
            bold: '700',
            ultra: '900',
        },
        sizes: {
            h1: 48,
            h2: 32,
            h3: 24,
            body: 18,
            small: 14,
        }
    }
};

export const globalStyles = StyleSheet.create({
    brutalistShadow: {
        ...BrutalistTheme.shadow.light,
    },
    brutalistBorder: {
        borderWidth: BrutalistTheme.border.width,
        borderRadius: BrutalistTheme.border.radius,
    }
});
