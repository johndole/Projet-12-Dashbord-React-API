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

const ActiviteQuotidienne = (props: Props) => {
  const { sessions } = props

  // Extract and format the day (removing leading zeros)
  const formatDay = (day: string) => {
    const dayNumber = parseInt(day.split("-")[2], 10)
    return dayNumber.toString()
  }

  // Calculate the minimum and maximum values for the kilogram and kcal data
  const kilogramValues = sessions.map((session) => session.kilogram)
  const minKilogram = Math.min(...kilogramValues)
  const maxKilogram = Math.max(...kilogramValues)

  const calorieValues = sessions.map((session) => session.calories)
  const minCalories = Math.min(...calorieValues)
  const maxCalories = Math.max(...calorieValues)

  // Calculate the middle value for the kilogram and kcal data
  const middleKilogram = (minKilogram + maxKilogram) / 2
  const middleCalories = (minCalories + maxCalories) / 2

  // Define the ticks for the Y-axes
  const kilogramTicks = [minKilogram, middleKilogram, maxKilogram]
  const calorieTicks = [minCalories, middleCalories, maxCalories]

  return (
    <div className="ActiviteQuotidienne">
      <h2>Activité quotidienne</h2>
      <div className="chart">
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            width={500}
            height={300}
            data={sessions}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickFormatter={formatDay}
            />

            <YAxis
              yAxisId="left"
              tickCount={3}
              orientation="right"
              domain={[minKilogram - 2, maxKilogram + 2]}
              type="number"
              allowDataOverflow={true}
              ticks={kilogramTicks}
            />

            <YAxis
              yAxisId="right"
              tickCount={3}
              orientation="left"
              domain={[minCalories - 100, maxCalories + 100]}
              type="number"
              allowDataOverflow={true}
              ticks={calorieTicks}
            />

            <Tooltip />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ top: 15, right: 0, left: 100, fontSize: "14px" }} // Set font size to 14px
            />
            <Bar
              dataKey="kilogram"
              name="Poids(kg)" // Custom legend label
              fill="#282D30"
              barSize={15}
              radius={[10, 10, 0, 0]}
              yAxisId="left"
            />
            <Bar
              dataKey="calories"
              name="Calories brûlées(kcal)" // Custom legend label
              fill="#E60000"
              barSize={15}
              radius={[10, 10, 0, 0]}
              yAxisId="right"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ActiviteQuotidienne
