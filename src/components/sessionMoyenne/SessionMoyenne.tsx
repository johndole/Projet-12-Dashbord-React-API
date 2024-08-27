import React, { useEffect, useState } from "react"
import {
  ComposedChart,
  Line,
  XAxis,
  Tooltip,
  Scatter,
  Rectangle,
  ResponsiveContainer,
  YAxis,
} from "recharts"
import "./sessionMoyenne.css"

interface Props {
  sessions: {
    day: number
    sessionLength: number
  }[]
}

const CustomCursor = (props: any) => {
  const { points } = props
  const { x } = points[0]
  return (
    <Rectangle
      fill="rgb(220, 0, 0, 0.9)" // Slightly transparent red
      stroke="none"
      x={x} // Adjust the x position to center the cursor
      y={0}
      width={400} // Width to cover the chart area
      height={236} // Adjust the height to cover the chart area
    />
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { day } = payload[0].payload
    // Do not show tooltip for virtual points
    if (day === 0.8 || day === 7.2) {
      return null
    }

    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value} min`}</p>
      </div>
    )
  }

  return null
}

// Custom ActiveDot Component
const CustomActiveDot = (props: any) => {
  const { cx, cy, r } = props
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="white"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r + 4}
        fill="rgba(255, 255, 255, 0.5)"
      />
    </g>
  )
}

const SessionMoyenne: React.FC<Props> = ({ sessions }) => {
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([])

  useEffect(() => {
    const convertToDays = (array: number[]): string[] => {
      const days = ["L", "M", "M", "J", "V", "S", "D"]
      return array.map((num) => days[num - 1])
    }

    const dayNumbers = sessions.map((session) => session.day)
    setDaysOfWeek(convertToDays(dayNumbers))
  }, [sessions])

  // Adjust the data to add padding before and after the week
  const adjustedSessions = [
    { day: 0.8, sessionLength: sessions[0].sessionLength }, // Before Monday
    ...sessions,
    { day: 7.2, sessionLength: sessions[sessions.length - 1].sessionLength }, // After Sunday
  ]

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 0, 0, 1)",
        borderRadius: "5px",
        width: "100%",
        height: "100%",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <ComposedChart
          data={adjustedSessions}
          margin={{
            top: 30, // Adjust top margin for title space
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient
              id="whiteGradient"
              x1="0"
              y1="0"
              x2="1"
            >
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity={0.2}
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity={1}
              />
            </linearGradient>
          </defs>

          <Tooltip
            content={<CustomTooltip />}
            cursor={<CustomCursor />}
          />
          <text
            x={20}
            y={20}
            fill="rgba(255, 255, 255, 0.5)"
            fontSize={14}
          >
            <tspan
              x={10}
              dy="0"
            >
              Durée moyenne
            </tspan>
            <tspan
              x={10}
              dy="20"
            >
              des sessions
            </tspan>
          </text>
          <YAxis
            hide={true}
            domain={["dataMin -5", "dataMax + 20"]}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            interval={0}
            tickFormatter={(tick) => {
              if (tick === 1) return "L" // Only format visible ticks
              if (tick === 2) return "M"
              if (tick === 3) return "M"
              if (tick === 4) return "J"
              if (tick === 5) return "V"
              if (tick === 6) return "S"
              if (tick === 7) return "D"
              return ""
            }}
            tick={{
              fill: "rgba(255, 255, 255, 0.5)",
              fontSize: 12,
            }}
            domain={[1, 7]} // Ensure only days 1-7 are visible
          />
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="url(#whiteGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={<CustomActiveDot r={4} />}
          />
          <Scatter
            dataKey={"sessionLength"[0]}
            fill="white"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SessionMoyenne
