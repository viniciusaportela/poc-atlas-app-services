import Realm from "realm";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useApp} from "@realm/react";
import {Dispatch, SetStateAction, useState} from "react";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

interface LoginProps {
  setPage: Dispatch<SetStateAction<string>>
}

export function Login({setPage}: LoginProps) {
  const app = useApp();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
  }

  const goToRegister = () => {
    setPage("register");
  }

  const authenticateWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      const googleToken = userInfo.idToken;

      const credentials = Realm.Credentials.google(userInfo);
      await app.logIn(credentials);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail}/>
      <TextInput placeholder="password" value={password} onChangeText={setPassword}/>
      <Button title={"Login"} onPress={login}/>
      <Button title={"Cadastrar"} onPress={goToRegister}/>
      <Button title="Login Google" onPress={authenticateWithGoogle}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  }
})
