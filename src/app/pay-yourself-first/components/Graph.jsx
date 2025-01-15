import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function numberWithSpaces(x) {
  return "R " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="bg-white py-2 px-3 rounded-lg shadow-lg border border-brandGreen">
        <p className="font-bold text-brandGreen">
          {numberWithSpaces(payload[0].value)}{" "}
        </p>
      </div>
    );
  }

  return null;
};
// eslint-disable-next-line react/prop-types
const OMLineChart = ({ width, height, data }) => {
  // eslint-disable-next-line react/prop-types
  let maxY = Math.max(data.map((row) => row.value));

  return (
    <div id="resultChart">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} fill="#F7F7F7">
          <Line
            type="monotone"
            dataKey="value"
            stroke="#159677"
            strokeWidth={2}
            isAnimationActive={false}
            margin={{ top: 20, right: 80, left: 90, bottom: 5 }}
            backgroundColor="#F7F7F7"
          />
          {/* <CartesianGrid stroke="#ccc" /> */}
          <XAxis />
          <YAxis
            width={80}
            padding={{ top: 10 }}
            tick={{ fontSize: 11 }}
            tickFormatter={numberWithSpaces}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={maxY} stroke="red" isOverflow="extendDomain">
            <Label value={maxY} position="left" fill="red" />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OMLineChart;
