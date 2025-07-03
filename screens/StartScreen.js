import { View, Text, Button, StyleSheet } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>전역타임</Text>
      <Button
        title="시작하기"
        onPress={() => navigation.navigate("Onboarding")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
