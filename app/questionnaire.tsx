import { Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function Questionnaire() {
  const { theme, typography } = useTheme();

  return (
    <View
      style={[
        theme.background.primary,
        { flex: 1, justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text style={typography.H1}>Questionnaire</Text>
      <Text style={[typography.BODY, { marginTop: theme.spacing.md }]}>
        Questionnaire will be implemented here
      </Text>
    </View>
  );
}
