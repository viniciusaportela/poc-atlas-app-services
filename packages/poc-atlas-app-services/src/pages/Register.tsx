import {Dispatch, SetStateAction, useState} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {API_URL} from "@env"

interface RegisterProps {
  setPage: Dispatch<SetStateAction<string>>
}

export function Register({setPage}: RegisterProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {});
      const data = await res.json();
      console.log("data", data)
      setPage("login");
    } catch (error) {
      console.error(error)
    }
  }

  const onChange = (dispatch: Dispatch<SetStateAction<string>>) => (value: string) => {
    dispatch(value)
  }

  return <View style={styles.container}>
    <Text>Register</Text>
    <TextInput placeholder="email" value={email} onChangeText={onChange(setEmail)}/>
    <TextInput placeholder="password" value={password} onChangeText={onChange(setPassword)}/>
    <Button onPress={() => setPage("login")} title="Voltar"/>
    <Button onPress={register} title="Cadastrar"/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  }
})