import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ThingForm } from "./components/ThingForm";
import { ThingList } from "./components/ThingList";
import { useState } from "react";

type Thing = {
  name: string;
  age: string;
};
export default function App() {
  const [things, setThings] = useState<Thing[]>([]);

  const addThing = (thing: Thing) => {
    if (thing.name.trim() && thing.age.trim()) {
      setThings((prevThings) => [...prevThings, thing]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.main}>
        <ThingForm addThing={addThing} />
        <ThingList things={things} />
      </View>
      <StatusBar style="auto" />
      <View style={styles.bottom}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  top: {
    backgroundColor: "lightblue",
    width: "100%",
    height: 60,
  },
  main: {
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    backgroundColor: "lightblue",
    width: "100%",
    height: 60,
  },
});
