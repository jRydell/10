import React from "react";
import { View, StyleSheet, Text } from "react-native";

type ThingListProps = {
  things: { name: string; age: string }[];
};

export function ThingList({ things }: ThingListProps) {
  return (
    <View style={styles.container}>
      {things.map((thing, index) => (
        <View key={index} style={styles.thingContainer}>
          <Text style={styles.thingText}>
            Name: {thing.name} Age: {thing.age}
          </Text>
          <Text style={styles.closeButton}>X</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  thingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "purple",
    padding: 12,
    marginBottom: 10,
    width: 350,
  },
  thingText: {
    fontSize: 18,
    color: "white",
  },
  closeButton: {
    fontSize: 20,
    color: "white",
  },
});
