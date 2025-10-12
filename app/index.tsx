import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Button } from "../components/Button";
import { useTheme } from "../contexts/ThemeContext";
import { hexToRgba } from "../utils";

export default function Index() {
  const { theme, typography, isDark } = useTheme();

  // Select background image based on theme
  const backgroundImage = isDark
    ? require("../assets/images/morning_dark.png")
    : require("../assets/images/morning.png");

  // Get gradient overlay color from theme
  const overlayColor = theme.colors.GRADIENT_OVERLAY;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
        resizeMode="cover"
        imageStyle={{ top: -57 }}
      >
        <LinearGradient
          colors={[
            hexToRgba(overlayColor, 0),
            hexToRgba(overlayColor, 0),
            hexToRgba(overlayColor, 1),
          ]}
          locations={[0, 0.2, 0.65]}
          style={{ flex: 1, padding: theme.spacing.lg }}
        >
          <View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                padding: theme.spacing.lg,
              },
            ]}
            pointerEvents="box-none"
          >
            <Text style={[typography.DISPLAY_LARGE, { textAlign: "center" }]}>
              Your healing journey starts here
            </Text>
            <Text style={[typography.BODY_LARGE, { textAlign: "center" }]}>
              Complete a short questionnaire to unlock your personal burnout
              plan
            </Text>
          </View>

          <View
            style={[
              {
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: theme.spacing.sm,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: theme.spacing.md,
              }}
            >
              <Svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                style={{ marginRight: theme.spacing.xs }}
              >
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 2C8.25 1.58579 8.58579 1.25 9 1.25L15 1.25C15.4142 1.25 15.75 1.58579 15.75 2C15.75 2.41421 15.4142 2.75 15 2.75L9 2.75C8.58579 2.75 8.25 2.41421 8.25 2Z"
                  fill={theme.colors.SECONDARY_TEXT}
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 9.25C12.4142 9.25 12.75 9.58579 12.75 10L12.75 14C12.75 14.4142 12.4142 14.75 12 14.75C11.5858 14.75 11.25 14.4142 11.25 14L11.25 10C11.25 9.58579 11.5858 9.25 12 9.25Z"
                  fill={theme.colors.SECONDARY_TEXT}
                />
                <Path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6.75C7.99594 6.75 4.75 9.99594 4.75 14C4.75 18.0041 7.99594 21.25 12 21.25C16.0041 21.25 19.25 18.0041 19.25 14C19.25 9.99594 16.0041 6.75 12 6.75ZM3.25 14C3.25 9.16751 7.16751 5.25 12 5.25C16.8325 5.25 20.75 9.16751 20.75 14C20.75 18.8325 16.8325 22.75 12 22.75C7.16751 22.75 3.25 18.8325 3.25 14Z"
                  fill={theme.colors.SECONDARY_TEXT}
                />
              </Svg>
              <Text
                style={[
                  typography.BODY,
                  { color: theme.colors.SECONDARY_TEXT },
                ]}
              >
                ~5 min to complete
              </Text>
            </View>

            <Button
              size="regular"
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.replace("/questionnaire");
              }}
            >
              Start Now
            </Button>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
