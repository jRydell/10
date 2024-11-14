import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";
import uuid from "react-native-uuid";

type ThingformProps = {
  addThing: (thing: { name: string; age: string; id: string }) => void;
};

export function ThingForm({ addThing }: ThingformProps) {
  const [thing, setThing] = useState<{ name: string; age: string }>({
    name: "",
    age: "",
  });

  const handlePress = () => {
    addThing({ ...thing, id: uuid.v4() });
    setThing({ name: "", age: "" });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={thing.name}
        onChangeText={(text) => setThing({ ...thing, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        value={thing.age}
        onChangeText={(text) => setThing({ ...thing, age: text })}
      />
      <View style={styles.buttonBox}>
        <View style={styles.button}>
          <Button title="Add thing" onPress={handlePress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: 350,
  },
  buttonBox: {
    flexDirection: "row",
    width: 350,
    justifyContent: "flex-end",
  },
  button: {
    width: 100,
  },
});
