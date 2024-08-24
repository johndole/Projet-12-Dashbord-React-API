import "./performances.css"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"

type Props = {
  userId: number
  kind: { [key: number]: string }
  data: { value: number; kind: number }[]
}

const Performances = (props: Props) => {
  // Function to shift the labels by one place
  const getShiftedKind = (value: number) => {
    const keys = Object.keys(props.kind).map(Number) // Get the keys as an array of numbers
    const currentIndex = keys.indexOf(value) // Find the current index
    const previousIndex = (currentIndex - 1 + keys.length) % keys.length // Calculate the previous index with wrap-around
    const previousValue = keys[previousIndex] // Get the value of the previous index
    return (
      props.kind[previousValue].charAt(0).toUpperCase() +
      props.kind[previousValue].slice(1)
    ) // Return the previous label capitalized
  }

  return (
    <div className="performances">
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="60%"
          data={props.data}
        >
          <PolarGrid
            radialLines={false}
            stroke="#FFFFFF"
          />
          <PolarAngleAxis
            tick={{ fill: "#FFFFFF", fontSize: 11 }}
            dataKey="kind"
            tickFormatter={getShiftedKind} // Use the shifted kind function
          />
          <Radar
            name="Performance"
            dataKey="value"
            fill="#FF0101B2"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Performances
