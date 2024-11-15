import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThingApp } from "./components/ThingApp";

export type RootStackTypes = {
  Home: undefined;
};

const Stack = createStackNavigator<RootStackTypes>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={ThingApp} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
}
