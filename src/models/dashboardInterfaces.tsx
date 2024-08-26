interface UserMainData {
  data: {
    id: number
    userInfos: {
      firstName: string
      lastName: string
      age: number
    }
    todayScore?: number
    score?: number
    keyData: {
      calorieCount: number
      proteinCount: number
      carbohydrateCount: number
      lipidCount: number
    }
  }
}

interface UserActivity {
  data: {
    userId: number
    sessions: {
      day: string
      kilogram: number
      calories: number
    }[]
  }
}

interface UserAverageSessions {
  data: {
    userId: number
    sessions: {
      day: number
      sessionLength: number
    }[]
  }
}

interface UserPerformance {
  data: {
    userId: number
    kind: { [key: number]: string }
    data: { value: number; kind: number }[]
  }
}

export type { UserMainData, UserActivity, UserAverageSessions, UserPerformance }
