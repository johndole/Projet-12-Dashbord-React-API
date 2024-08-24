import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./sessionMoyenne.css";
import { useEffect, useState } from "react";

interface Props {
  sessions: {
    day: number;
    sessionLength: number;
  }[];
}

const SessionMoyenne = (props: Props) => {
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);

  useEffect(() => {
    const convertToDays = (array: number[]): string[] => {
      const days = ["L", "M", "M", "J", "V", "S", "D"];
      return array.map((num) => days[num - 1]);
    };

    setDaysOfWeek(convertToDays(props.sessions.map((session) => session.day)));
  }, [props.sessions]);

  const DaysConverted = props.sessions.map((session, index) => ({
    day: daysOfWeek[index],
    sessionLength: session.sessionLength,
  }));

  const legendPayload = [
    { value: "Duree moyenne des sessions", type: "line", color: "#8884d8" },
  ];
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            color: "#black",
            padding: "1px 10px",
            fontWeight: "bold",
          }}
        >
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="sessionMoyenne">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={DaysConverted} // Modify data here
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop
                  offset="81.27%"
                  stopColor="rgba(255, 255, 255, 0.403191)"
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={13}
              tickSize={0}
              tick={{ fill: "#fff", opacity: "70%", fontSize: 14 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickCount={3}
              domain={[0, 90]}
              width={0}
            />
            <Tooltip content={CustomTooltip} />
            <Tooltip />
            <Legend
              verticalAlign="top"
              layout="centric"
              iconSize={0}
              payload={legendPayload as any}
              width={200}
              formatter={(value) => (
                <span className="text-color-class">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="sessionLength"
              stroke="url(#gradient)"
              strokeWidth={3}
              activeDot={{ strokeWidth: 2, r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SessionMoyenne;
