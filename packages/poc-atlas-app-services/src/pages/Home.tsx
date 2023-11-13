import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import Realm from "realm"
import {useApp, useQuery, useRealm, useUser} from "@realm/react";
import {useEffect, useState} from "react";
import {Task} from "../schemas/Task";

export function Home() {
  const app = useApp();
  const realm = useRealm();
  const user = useUser();
  const [customUserData, setCustomUserData] = useState();

  const tasks = useQuery(Task);

  useEffect(() => {
    readCurrentCustomUserData();
  }, []);

  function readCurrentCustomUserData() {
    setCustomUserData(user.customData);
  }

  async function refreshCustomUserData() {
    const data = await user.refreshCustomData();
    setCustomUserData(data);
  }

  async function logout() {
    await app.currentUser?.logOut();
  }

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    )
  }

  const createTask = () => {
    realm.write(() => {
      realm.create("Task", {
        _id: new Realm.BSON.ObjectId(),
        name: `New Task ${new Date().getTime()}`,
        difficulty: "easy"
      })
    })
  }

  console.log(realm.subscriptions.length);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(customUserData, null, 2)}</Text>
      <Button title="refresh custom user data" onPress={refreshCustomUserData}/>
      <Button title="logout" onPress={logout}/>
      <Button title="Create task" onPress={createTask}/>
      <View style={{marginBottom: 12}}/>
      <FlatList data={tasks} renderItem={renderItem}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  }
})