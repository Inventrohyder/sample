import { ScrollView, Text, View } from "react-native";
import { COMPONENTS, FONTS, THEME, THEMED_TYPOGRAPHY } from "../constants";
import { Button } from "../components/Button";

export default function Index() {
  return (
    <ScrollView
      style={[
        {
          flex: 1,
          padding: THEME.spacing.lg,
        },
        THEME.background.primary,
      ]}
      contentContainerStyle={{
        paddingTop: 60,
        paddingBottom: 40,
      }}
    >
      {/* Cardo Font Examples - Headings and Titles */}
      <View style={{ marginBottom: THEME.spacing.xl }}>
        <Text
          style={[THEMED_TYPOGRAPHY.H1, { marginBottom: THEME.spacing.lg }]}
        >
          Cardo Font Examples
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.H2, { marginBottom: THEME.spacing.md }]}
        >
          This is H2 Heading
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.H3, { marginBottom: THEME.spacing.sm }]}
        >
          This is H3 Heading
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.H4, { marginBottom: THEME.spacing.sm }]}
        >
          This is H4 Heading
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.H5, { marginBottom: THEME.spacing.xs }]}
        >
          This is H5 Heading
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.H6, { marginBottom: THEME.spacing.xs }]}
        >
          This is H6 Heading
        </Text>
      </View>

      {/* Commissioner Font Examples - Body Text */}
      <View style={{ marginBottom: THEME.spacing.xl }}>
        <Text
          style={[THEMED_TYPOGRAPHY.H2, { marginBottom: THEME.spacing.lg }]}
        >
          Commissioner Font Examples
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY_LARGE,
            { marginBottom: THEME.spacing.md },
          ]}
        >
          This is large body text using Commissioner Regular. It&apos;s perfect
          for important paragraphs and descriptions.
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.BODY, { marginBottom: THEME.spacing.sm }]}
        >
          This is regular body text using Commissioner Regular. It&apos;s ideal
          for most content and readable text.
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY_SMALL,
            { marginBottom: THEME.spacing.sm },
          ]}
        >
          This is small body text using Commissioner Regular. Great for
          secondary information and captions.
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.CAPTION,
            { marginBottom: THEME.spacing.xs },
          ]}
        >
          This is caption text using Commissioner Medium.
        </Text>

        <Text
          style={[THEMED_TYPOGRAPHY.LABEL, { marginBottom: THEME.spacing.xs }]}
        >
          This is label text using Commissioner Medium.
        </Text>
      </View>

      {/* Font Weight Examples */}
      <View style={{ marginBottom: THEME.spacing.xl }}>
        <Text
          style={[THEMED_TYPOGRAPHY.H2, { marginBottom: THEME.spacing.lg }]}
        >
          Commissioner Weight Examples
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.THIN,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Thin: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.LIGHT,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Light: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.REGULAR,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Regular: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.MEDIUM,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Medium: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.SEMI_BOLD,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Semi Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.BOLD,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.EXTRA_BOLD,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Extra Bold: The quick brown fox jumps over the lazy dog
        </Text>

        <Text
          style={[
            THEMED_TYPOGRAPHY.BODY,
            {
              fontFamily: FONTS.COMMISSIONER.BLACK,
              marginBottom: THEME.spacing.xs,
            },
          ]}
        >
          Black: The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      {/* Button Examples */}
      <View style={{ marginBottom: THEME.spacing.xl }}>
        <Text
          style={[THEMED_TYPOGRAPHY.H2, { marginBottom: THEME.spacing.lg }]}
        >
          Button Examples
        </Text>

        <Button
          size="large"
          onPress={() => console.log("Large button pressed")}
          style={{ marginBottom: THEME.spacing.sm }}
        >
          Large Button
        </Button>

        <Button
          size="regular"
          onPress={() => console.log("Regular button pressed")}
          style={{ marginBottom: THEME.spacing.sm }}
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
