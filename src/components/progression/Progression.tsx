import "./progression.css"
import { PieChart, Pie, Cell, Label } from "recharts"

const COLORS = ["#008000", "#FFFFFF"]

const Progression = ({ todayScore }: any) => {
  if (todayScore === undefined) {
    return <div>No data available</div>
  }

  const data = [
    { name: "Progress", value: todayScore },
    { name: "Remaining", value: 1 - todayScore },
  ]

  return (
    <div className="progression">
      <p
        style={{
          fontSize: 16,
          fontWeight: 700,
          margin: 0,
          marginLeft: 10,
          marginTop: 10,
        }}
      >
        Score
      </p>
      <PieChart
        width={200}
        height={200}
        style={{ width: "100%", height: "100%" }}
        margin={{ top: -20, right: 0, bottom: 0, left: 0 }}
      >
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={90}
          endAngle={450}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              {...entry}
            />
          ))}
          <Label
            value={`${todayScore * 100}%`}
            position="center"
            fontSize={18}
            fontWeight={700}
            fill="black"
            textAnchor="middle"
            width={100}
          />
          <Label
            className="progression-label"
            position="center"
            dy={25}
          >
            de votre objectif
          </Label>
        </Pie>
      </PieChart>
    </div>
  )
}

export default Progression
