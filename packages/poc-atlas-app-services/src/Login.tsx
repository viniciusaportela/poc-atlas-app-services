import {StyleSheet, Text, View} from "react-native";

interface LoginProps {
  onNavigate?: (page: string) => void;
}

export function Login({onNavigate}: LoginProps = {}) {
  

  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})