// Import necessary components and hooks from React and React Native
import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Define the interface for the props expected by the SwipeableListItem component
type SwipeableListItemProps = {
  children: React.ReactNode; // Child elements to be displayed inside the component
  onDelete: () => void; // Function to call when item is deleted
  deleteText?: string; // Optional text to display on delete button
  deleteTextStyle?: StyleProp<TextStyle>; // Optional style for delete text
  deleteContainerStyle?: StyleProp<ViewStyle>; // Optional style for delete container
  swipeThreshold?: number; // Optional threshold to trigger delete swipe action
};

// Define the SwipeableListItem functional component
const SwipeableListItem = ({
  children,
  onDelete,
  deleteText = "Delete", // Default text for delete button
  deleteTextStyle,
  deleteContainerStyle,
  swipeThreshold = 100, // Default swipe threshold
}: SwipeableListItemProps) => {
  // Initialize a ref to track the X translation value for swipe animation
  const translateX = useRef(new Animated.Value(0)).current;

  // Define a pan responder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      // Determine if the gesture should be handled when it starts
      onStartShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,
      // Determine if the gesture should be handled when it moves
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,
      // Handle the movement of the swipe gesture
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          // Allow swipe only to the left
          translateX.setValue(gestureState.dx); // Update translateX with gesture movement
        }
      },
      // Handle what happens when the user releases the swipe
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -swipeThreshold / 2) {
          // If swipe exceeds half the threshold, animate to full delete position
          Animated.spring(translateX, {
            toValue: -swipeThreshold,
            useNativeDriver: true,
          }).start();
        } else {
          // Otherwise, reset position to 0
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Function to handle delete button press with animation off-screen
  const handleDeletePress = () => {
    Animated.timing(translateX, {
      toValue: -500, // Move the item far off-screen
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete(); // Call the delete function passed in props
      translateX.setValue(0); // Reset position for potential reuse
    });
  };

  // Render the swipeable list item component
  return (
    <View style={styles.container}>
      {/* Hidden container for delete button, visible when swiped */}
      <View style={styles.hiddenContainer}>
        <TouchableOpacity
          style={[styles.deleteButton, deleteContainerStyle]}
          onPress={handleDeletePress}
        >
          <Text style={[styles.deleteText, deleteTextStyle]}>{deleteText}</Text>
        </TouchableOpacity>
      </View>
      {/* Main animated view containing the child elements */}
      <Animated.View
        style={[styles.animatedView, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    position: "relative", // Allows positioning of delete button overlay
    backgroundColor: "#fff",
  },
  hiddenContainer: {
    position: "absolute", // Positioned to overlap animated view
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // Red background for delete button
  },
  animatedView: {
    backgroundColor: "#fff", // Background for main view
  },
  deleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center", // Center delete text within button
  },
  deleteText: {
    color: "#fff", // White text color for delete text
    fontWeight: "bold",
  },
});

// Export the component to use in other parts of the app
export default SwipeableListItem;
