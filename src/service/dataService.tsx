import axios from "axios"

import {
  UserActivity,
  UserAverageSessions,
  UserMainData,
  UserPerformance,
} from "../models/dashboardInterfaces"

import mockUserData from "../__mocks__/mockUserData"
import mockPerformanceData from "../__mocks__/mockPerformanceData"
import mockActivityData from "../__mocks__/mockActivityData"
import mockAverageSessionData from "../__mocks__/mockAverageSessionData"

export interface SportStatsGateway {
  fetchUserData(userId: number): Promise<UserMainData>
  fetchPerformanceData(userId: number): Promise<UserPerformance>
  fetchActivityData(userId: number): Promise<UserActivity>
  fetchAverageSessionData(userId: number): Promise<UserAverageSessions>
}

export class FakeSportStatsGateway implements SportStatsGateway {
  async fetchUserData(userId: number): Promise<UserMainData> {
    return mockUserData.find((stats) => stats.data.id === userId)!
  }
  async fetchPerformanceData(userId: number): Promise<UserPerformance> {
    return mockPerformanceData.find((stats) => stats.data.userId === userId)!
  }
  async fetchActivityData(userId: number): Promise<UserActivity> {
    return mockActivityData.find((stats) => stats.data.userId === userId)!
  }
  async fetchAverageSessionData(userId: number): Promise<UserAverageSessions> {
    return mockAverageSessionData.find((stats) => stats.data.userId === userId)!
  }
}

const baseUrl = "http://localhost:3000"

export class FetchSportStatsGateway implements SportStatsGateway {
  async fetchUserData(userId: number): Promise<UserMainData> {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async fetchPerformanceData(userId: number): Promise<UserPerformance> {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}/performance`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async fetchActivityData(userId: number): Promise<UserActivity> {
    try {
      const response = await axios.get(`${baseUrl}/user/${userId}/activity`)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async fetchAverageSessionData(userId: number): Promise<UserAverageSessions> {
    try {
      const response = await axios.get(
        `${baseUrl}/user/${userId}/average-sessions`
      )
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
