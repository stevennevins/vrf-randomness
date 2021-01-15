import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label
} from "recharts";
import { InputNumber, Slider, Row, Col } from "antd";
const d3 = require("d3");

const range = (start, stop, step = 0) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export default function Graph({ randomnessFulfilled }) {
  const [moduloPct, setModuloPct] = useState(1);
  const [bins, setBins] = useState(50);
  const upper_bound = moduloPct * 2 ** 256;
  const data = randomnessFulfilled
    .map((e) => JSON.parse(e[1]))
    .map((d) => d % upper_bound);
  const domain = [0, upper_bound];
  const thresholds = range(0, upper_bound, upper_bound / bins);
  const histGenerator = d3.bin().domain(domain).thresholds(thresholds);
  const hist = histGenerator(data).map((d, index) => [
    (index / bins).toFixed(2),
    d.length
  ]);

  function onStepChange(value) {
    setBins(value);
    console.log("changed", value);
  }
  function onSliderChange(value) {
    setModuloPct(value);
    console.log("changed", value);
  }

  return (
    <div>
      <h2>FulfilledRandomnessResults Counts as % of UpperBound:</h2>
      <h4> Kovan Network VRF Coordinator </h4>
      <BarChart width={600} height={300} padding={20} data={hist}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="0">
          <Label
            value="% of Upper Bound"
            // position="insideLeft"
            dy={12}
            style={{ textAnchor: "middle" }}
          />
        </XAxis>
        <YAxis>
          <Label
            angle={-90}
            value="Count"
            position="insideLeft"
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Bar dataKey="1" fill="#8884d8" />
      </BarChart>
      <Row>
        <Col span={2}>{"# Bins"}</Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={100}
            defaultValue={50}
            onChange={onStepChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={4}>{"Modulo as Fraction of UpperBound uint256"}</Col>
        <Col span={12}>
          <Slider
            defaultValue={30}
            min={0.01}
            max={1}
            onChange={onSliderChange}
            step={0.01}
          />
        </Col>
        <Col span={2} style={{ paddingLeft: 4 }}>
          {moduloPct}
        </Col>
      </Row>
    </div>
  );
}
