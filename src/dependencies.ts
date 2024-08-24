import {
  SportStatsGateway,
  FakeSportStatsGateway,
  FetchSportStatsGateway,
} from "./service/dataService"

export type Dependencies = {
  sportStatsGateway: SportStatsGateway
}

export const dependencies: Dependencies = {
  sportStatsGateway:
    process.env.NODE_ENV === "development"
      ? new FakeSportStatsGateway()
      : new FetchSportStatsGateway(),
}
