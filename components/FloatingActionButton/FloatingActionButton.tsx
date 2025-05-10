import React, { useState } from "react";
import { AnimatedFAB, AnimatedFABProps } from "react-native-paper";

import styles from "./styles";
import { GestureResponderEvent } from "react-native";

export default function FloatingActionButton(props: AnimatedFABProps) {
  const { onPress, extended, style, ...rest } = props;
  const [isExtended, setIsExtended] = useState(extended);
  function handlePress(event: GestureResponderEvent) {
    setIsExtended(!isExtended);
    onPress?.(event);
  }
  return (
    <AnimatedFAB
      {...rest}
      extended={isExtended}
      onPress={handlePress}
      style={[styles.fabStyle, style]}
    />
  );
}
