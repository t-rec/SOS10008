const brandRed = "#F03F33";
const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#1F2937",
        background: "#FAFAFA",
        card: "#FFFFFF",
        tint: tintColorLight,
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorLight,
        border: "#E5E7EB",
        subtitle: "#4B5563",
        brand: brandRed,
        secondaryButton: "#FFFFFF",
        secondaryButtonText: "#1F2937",
        secondaryButtonBorder: "#FEE2E2",
    },
    dark: {
        text: "#F9FAFB",
        background: "#111827", // gray-900
        card: "#1F2937", // gray-800
        tint: tintColorDark,
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorDark,
        border: "#374151", // gray-700
        subtitle: "#9CA3AF", // gray-400
        brand: brandRed,
        secondaryButton: "#1F2937",
        secondaryButtonText: "#F9FAFB",
        secondaryButtonBorder: "#374151",
    },
};

export default Colors;
