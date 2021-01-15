import React from "react";
import { useEventReader, useEventListener } from "eth-hooks";
import Graph from "./Graph";

export default function Home({ contract, provider }) {
  const randomnessFulfilled = useEventReader(
    contract,
    "RandomnessRequestFulfilled",
    provider,
    22512201
  );

  return (
    <div style={{ padding: 16 }}>
      <Graph randomnessFulfilled={randomnessFulfilled} />
    </div>
  );
}
