import "./progression.css"
import { PieChart, Pie, Cell, Label } from "recharts"

const COLORS = ["#FF0000", "#F5F5F5"]

const Progression = ({
  todayScore,
  score,
}: {
  todayScore?: number
  score?: number
}) => {
  const progress = todayScore !== undefined ? todayScore : score

  if (progress === undefined) {
    return <div>No data available</div>
  }

  const data = [
    { name: "Progress", value: progress },
    { name: "Remaining", value: 1 - progress },
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
          innerRadius={70}
          outerRadius={80}
          cornerRadius={20} // Rounded ends for the arc
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
            value={`${(progress * 100).toFixed(0)}%`}
            position="center"
            fontSize={24}
            fontWeight={700}
            fill="black"
            textAnchor="middle"
            dy={-5} // Move the percentage slightly upwards
          />
          <Label
            value="de votre"
            position="centerBottom"
            fontSize={14}
            fontWeight={400}
            fill="gray"
            dy={25} // Move "de votre" slightly downwards
            textAnchor="middle"
          />
          <Label
            value="objectif"
            position="centerBottom"
            fontSize={14}
            fontWeight={400}
            fill="gray"
            dy={45} // Move "objectif" further downwards
            textAnchor="middle"
          />
        </Pie>
      </PieChart>
    </div>
  )
}

export default Progression
