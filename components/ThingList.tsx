import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SwipeableListItem from "../components/SwipeableListItem";

type Thing = {
  name: string;
  age: string;
  id: string;
};

type ThingListProps = {
  things: Thing[];
  deleteThing: (id: string) => void;
};

export function ThingList({ things, deleteThing }: ThingListProps) {
  console.log(things);

  const renderThingContent = (thing: Thing) => (
    <View style={styles.thingContainer}>
      <Text style={styles.thingText}>
        Name: {thing.name}, Age: {thing.age}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Thing }) => (
    <SwipeableListItem onDelete={() => deleteThing(item.id)}>
      {renderThingContent(item)}
    </SwipeableListItem>
  );

  return (
    <FlatList
      data={things}
      renderItem={renderItem}
      keyExtractor={(thing) => thing.id}
      contentContainerStyle={styles.container}
    />
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
});
