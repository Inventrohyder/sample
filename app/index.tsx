import { ScrollView, Text, View } from "react-native";
import { Button } from "../components/Button";
import { FONTS } from "../constants";
import { useTheme } from "../contexts/ThemeContext";

export default function Index() {
  const { theme, typography, colorScheme } = useTheme();

  return (
    <ScrollView
      style={[
        {
          flex: 1,
          padding: theme.spacing.lg,
        },
        theme.background.primary,
      ]}
      contentContainerStyle={{
        paddingTop: 60,
        paddingBottom: 40,
      }}
    >
      {/* Theme Indicator */}
      <View style={{ marginBottom: theme.spacing.xl, alignItems: "center" }}>
        <Text style={[typography.H2, { marginBottom: theme.spacing.sm }]}>
          Current Theme: {colorScheme}
        </Text>
        <Text style={typography.BODY_SMALL}>
          (Automatically follows system preference)
        </Text>
      </View>

      {/* Cardo Font Examples - Headings and Titles */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text style={[typography.H1, { marginBottom: theme.spacing.lg }]}>
          Cardo Font Examples
        </Text>

        <Text style={[typography.H2, { marginBottom: theme.spacing.md }]}>
          This is H2 Heading
        </Text>

        <Text style={[typography.H3, { marginBottom: theme.spacing.sm }]}>
          This is H3 Heading
        </Text>

        <Text style={[typography.H4, { marginBottom: theme.spacing.sm }]}>
          This is H4 Heading
        </Text>

        <Text style={[typography.H5, { marginBottom: theme.spacing.xs }]}>
          This is H5 Heading
        </Text>

        <Text style={[typography.H6, { marginBottom: theme.spacing.xs }]}>
          This is H6 Heading
        </Text>
      </View>

      {/* Commissioner Font Examples - Body Text */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text style={[typography.H2, { marginBottom: theme.spacing.lg }]}>
          Commissioner Font Examples
        </Text>

        <Text
          style={[typography.BODY_LARGE, { marginBottom: theme.spacing.md }]}
        >
          This is large body text using Commissioner Regular. It&apos;s perfect
          for important paragraphs and descriptions.
        </Text>

        <Text style={[typography.BODY, { marginBottom: theme.spacing.sm }]}>
          This is regular body text using Commissioner Regular. It&apos;s ideal
          for most content and readable text.
        </Text>

        <Text
          style={[typography.BODY_SMALL, { marginBottom: theme.spacing.sm }]}
        >
          This is small body text using Commissioner Regular. Great for
          secondary information and captions.
        </Text>

        <Text style={[typography.CAPTION, { marginBottom: theme.spacing.xs }]}>
          This is caption text using Commissioner Medium.
        </Text>

        <Text style={[typography.LABEL, { marginBottom: theme.spacing.xs }]}>
          This is label text using Commissioner Medium.
        </Text>
      </View>

      {/* Font Weight Examples */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text style={[typography.H2, { marginBottom: theme.spacing.lg }]}>
          Commissioner Weight Examples
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.THIN,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Thin: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.LIGHT,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Light: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.REGULAR,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Regular: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.MEDIUM,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Medium: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.SEMI_BOLD,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Semi Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.BOLD,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.EXTRA_BOLD,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Extra Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            typography.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.BLACK,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          Black: The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      {/* Button Examples */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text style={[typography.H2, { marginBottom: theme.spacing.lg }]}>
          Button Examples
        </Text>

        <Button
          size="large"
          onPress={() => console.log("Large button pressed")}
          style={{ marginBottom: theme.spacing.sm }}
        >
          Large Button
        </Button>

        <Button
          size="regular"
          onPress={() => console.log("Regular button pressed")}
          style={{ marginBottom: theme.spacing.sm }}
        >
          Regular Button
        </Button>

        <Button
          size="small"
          onPress={() => console.log("Small button pressed")}
        >
          Small Button
        </Button>
      </View>
    </ScrollView>
  );
}
