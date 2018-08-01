// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Are you ready to rock</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default App;
