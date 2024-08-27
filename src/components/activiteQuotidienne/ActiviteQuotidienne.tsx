import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import "./activiteQuotidienne.css"

type Props = {
  sessions: {
    day: string
    kilogram: number
    calories: number
  }[]
}

const CustomLegend = (props: any) => {
  const { payload } = props
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {payload.map((entry: any, index: number) => (
        <div
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", marginLeft: 20 }}
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 32 32"
            style={{ marginRight: 5 }}
          >
            <circle
              fill={entry.color}
              cx="16"
              cy="16"
              r="16"
            />
          </svg>
          <span style={{ color: "#000000", fontSize: 14, fontWeight: 500 }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const ActiviteQuotidienne = (props: Props) => {
  const { sessions } = props

  // Extract and format the day (removing leading zeros)
  const formatDay = (day: string) => {
    const dayNumber = parseInt(day.split("-")[2], 10)
    return dayNumber.toString()
  }

  // Calculate the minimum and maximum values for the kilogram and kcal data
  const kilogramValues = sessions.map((session) => session.kilogram)
  const minKilogram = Math.floor(Math.min(...kilogramValues)) // Round down to nearest integer
  const maxKilogram = Math.ceil(Math.max(...kilogramValues) + 1) // Round up to nearest integer and add 1

  const calorieValues = sessions.map((session) => session.calories)
  const minCalories = Math.min(...calorieValues)
  const maxCalories = Math.max(...calorieValues)

  return (
    <div className="ActiviteQuotidienne">
      <h2>Activité quotidienne</h2>
      <div className="chart">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            data={sessions}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={8}
            barCategoryGap="20%"
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="day"
              tickFormatter={formatDay}
              tick={{ fontSize: 14, fill: "#9B9EAC" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              domain={[minKilogram - 1, maxKilogram]} // Adjusted maxKilogram + 1
              tick={{ fontSize: 14, fill: "#9B9EAC" }}
              axisLine={false}
              tickLine={false}
              orientation="right"
              tickCount={4} // Ensure it shows only relevant ticks
              allowDecimals={false} // Ensure only integers are shown
            />
            <YAxis
              yAxisId="right"
              domain={[minCalories - 100, maxCalories + 100]}
              hide
            />
            <Tooltip
              labelFormatter={() => ""} // Prevent the day from being displayed
              contentStyle={{ backgroundColor: "#E60000", color: "#FFFFFF" }}
              itemStyle={{ color: "#FFFFFF" }}
              formatter={(value, name) => {
                if (name === "kilogram") {
                  return `${value} kg` // Ensure the unit is appended to the value
                }
                if (name === "calories") {
                  return `${value} kcal` // Ensure the unit is appended to the value
                }
                return value
              }}
            />

            <Legend
              content={<CustomLegend />}
              wrapperStyle={{
                position: "absolute",
                top: -35,
                right: 30,
              }}
            />
            <Bar
              dataKey="kilogram"
              name="Poids (kg)"
              fill="#282D30"
              barSize={7}
              radius={[50, 50, 0, 0]}
              yAxisId="left"
            />
            <Bar
              dataKey="calories"
              name="Calories brûlées (kcal)"
              fill="#E60000"
              barSize={7}
              radius={[50, 50, 0, 0]}
              yAxisId="right"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ActiviteQuotidienne
