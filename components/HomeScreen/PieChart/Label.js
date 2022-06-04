import React from "react";
import { LabelLine } from './LabelLine'
import { getColor } from './utils/colors'
import { View, Text } from 'react-native'
import { getXOffset, getYOffset, getAverage } from './utils/math'
import { G } from "react-native-svg";
export const Label = ({
  index,
  datum,
  innerRadius,
  radius,
  slice: { startAngle, endAngle },
  nameKey,
  valueKey,
  cx,
  cy }) => {

  const middleRadius = getAverage([innerRadius, radius]);
  const midAngle = getAverage([endAngle, startAngle]);
  const labelOffset = radius + middleRadius / 3;
  const x = cx + getXOffset(labelOffset, midAngle);
  const y = cy + getYOffset(labelOffset, midAngle);
  const textAnchor = cx < x ? "start" : "end";

  const name = datum[nameKey];
  const value = datum[valueKey];

  return (
    <G>

      <Text x={x} y={y} textAnchor={textAnchor} fill={getColor(index)}>
        {name + '-' + Math.round(value) + '%'}
      </Text>

      <LabelLine
        cx={cx}
        cy={cy}
        middleRadius={middleRadius}
        radius={radius}
        midAngle={midAngle}
      />


    </G>
  );
};


