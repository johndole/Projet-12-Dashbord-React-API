import "./home.css"

import { useState, useEffect } from "react"
import Greetings from "../components/greetings/Greetings"
import ActiviteQuotidienne from "../components/activiteQuotidienne/ActiviteQuotidienne"
import Performance from "../components/performances/Performances"
import MacroNutrientsProfile from "../components/macroNutrientsProfile/MacroNutrientsProfile"
import SessionMoyenne from "../components/sessionMoyenne/SessionMoyenne"
import Progression from "../components/progression/Progression"
import {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../models/dashboardInterfaces"
import { useDependencies } from "../dependencies.context"

interface DashboardState {
  userData: UserMainData
  performanceData: UserPerformance
  activityData: UserActivity
  averageSessionData: UserAverageSessions
  loading: boolean
  error: Error | null
}

function Dashboard(props: { userId: number }) {
  const { sportStatsGateway } = useDependencies()

  const [state, setState] = useState<DashboardState>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = props.userId
        const [userData, performanceData, activityData, averageSessionData] =
          await Promise.all([
            sportStatsGateway.fetchUserData(userId),
            sportStatsGateway.fetchPerformanceData(userId),
            sportStatsGateway.fetchActivityData(userId),
            sportStatsGateway.fetchAverageSessionData(userId),
          ])

        setState({
          userData,
          performanceData,
          activityData,
          averageSessionData,
          loading: false,
          error: null,
        })
      } catch (error) {
        console.error("Error fetching data", error)
      }
    }

    fetchData()
  }, [props.userId, sportStatsGateway])

  if (!state) return <div>no data set</div>

  const {
    loading,
    error,
    userData,
    performanceData,
    activityData,
    averageSessionData,
  } = state!

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <main className="home">
      <Greetings {...userData.data} />

      <div className="box">
        <div className="box1">
          <div className="activite-container">
            <ActiviteQuotidienne {...activityData.data} />
          </div>
          <div className="session-container">
            <SessionMoyenne {...averageSessionData.data} />
            <Performance {...performanceData.data} />
            <Progression {...userData.data} />
          </div>
        </div>
        <div className="box2">
          <MacroNutrientsProfile
            keyData={userData.data.keyData.calorieCount}
            keyDataValue="kCal"
            keyDataName="Calories"
            src="./src/assets/kcal.svg"
            style={{ backgroundColor: "#ffa9a9" }}
          />

          <MacroNutrientsProfile
            keyData={userData.data.keyData.proteinCount}
            keyDataValue="g"
            keyDataName="Protéines"
            src="./src/assets/kcal.svg"
            style={{ backgroundColor: "#ffa9a9" }}
          />

          <MacroNutrientsProfile
            keyData={userData.data.keyData.lipidCount}
            keyDataValue="g"
            keyDataName="Glucides"
            src="./src/assets/kcal.svg"
            style={{ backgroundColor: "#ffa9a9" }}
          />

          <MacroNutrientsProfile
            keyData={userData.data.keyData.carbohydrateCount}
            keyDataValue="g"
            keyDataName="Lipides"
            src="./src/assets/kcal.svg"
            style={{ backgroundColor: "#ffa9a9" }}
          />
        </div>
      </div>
    </main>
  )
}

export default Dashboard
