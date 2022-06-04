import React from "react";
import { Text,View } from 'react-native'
import { getXOffset, getYOffset } from "./utils/math";
import { Polyline } from "react-native-svg";

export const LabelLine = ({ cx, cy, midAngle, middleRadius, radius }) => {
  const xStart = cx + getXOffset(middleRadius, midAngle);
  const yStart = cy + getYOffset(middleRadius, midAngle);
  const offSetEnd = 2 * radius - middleRadius;
  const xEnd = cx + getXOffset(offSetEnd, midAngle);
  const yEnd = cy + getYOffset(offSetEnd, midAngle);

  return (
    <View>
      <Polyline
        style={{
          opacity: "0.3",
          fill: "none",
          stroke: "black",
          strokeWidth: "2.5px"
        }}
        points={`${xStart},${yStart} ${xEnd},${yEnd}`}
      />

      

    </View>


  );
};

