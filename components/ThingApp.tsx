import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { ThingForm } from "./ThingForm";
import { ThingList } from "./ThingList";

type Thing = {
  name: string;
  age: string;
  id: string;
};

export function ThingApp() {
  const [things, setThings] = useState<Thing[]>([]);

  const addThing = (thing: Thing) => {
    if (thing.name.trim() && thing.age.trim()) {
      setThings((prevThings) => [...prevThings, thing]);
    }
  };

  const deleteThing = (id: string) => {
    setThings((prevThings) => prevThings.filter((thing) => thing.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <View style={styles.main}>
        <ThingForm addThing={addThing} />
        <ThingList things={things} deleteThing={deleteThing} />
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
    marginTop: 100,
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    marginTop: 50,
    backgroundColor: "lightblue",
    width: "100%",
    height: 60,
  },
});
