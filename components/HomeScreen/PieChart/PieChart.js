import React from "react";
import { VictoryPie } from 'victory-native'
import { Label } from "./Label";
import { PieChartColors } from "./utils/colors";

export const PieChart = ({
  innerRadius,
  radius,
  height,
  width,
  data,
  nameKey,
  valueKey
}) => {
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <VictoryPie
      height={200}
      width={200}
      style={{
        data: {
          fillOpacity: 0.4, stroke: "#c43a31", strokeWidth: 1
        },

      }}
      radius={radius}
      innerRadius={innerRadius}
      padAngle={0.5}
      cornerRadius={3}
      colorScale={PieChartColors}
      animate={{ duration: 200 }}
      data={data}
      x={nameKey}
      y={valueKey}
      labelComponent={
        <Label
          innerRadius={innerRadius}
          radius={radius}
          nameKey={nameKey}
          valueKey={valueKey}
          cx={centerX}
          cy={centerY}
        />
      }
    />
  );
};

PieChart.defaultProps = {
  height: 200,
  width: 400,
  innerRadius: 55,
  radius: 75,
  nameKey: "x",
  valueKey: "y"
};

