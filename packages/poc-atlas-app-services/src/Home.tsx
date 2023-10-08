import {StyleSheet, Text, View} from "react-native";

interface HomeProps {
  onNavigate?: (page: string) => void;
}

export function Home({onNavigate}: HomeProps = {}) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})