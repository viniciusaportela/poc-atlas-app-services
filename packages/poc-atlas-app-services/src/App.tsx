import {Home} from "./pages/Home";
import {AppProvider, RealmProvider, UserProvider} from "@realm/react";
import {ATLAS_APP_ID, WEB_CLIENT_ID} from "@env"
import {Unauthenticated} from "./pages/Unauthenticated";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {Task} from "./schemas/Task";

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID
});

export default function App() {
  return <AppProvider id={ATLAS_APP_ID}>
    <UserProvider fallback={() => <Unauthenticated/>}>
      <RealmProvider schema={[Task]} sync={{
        flexible: true,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects(Task));
          },
        },
      }}>
        <Home/>
      </RealmProvider>
    </UserProvider>
  </AppProvider>
}
