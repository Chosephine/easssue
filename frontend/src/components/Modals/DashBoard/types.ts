export type graphLabels = string[];
export type graphData = number[];
export type grassValues = {
  count: number;
  date: string;
};
export interface DashInfo {
  graph: {
    labels: graphLabels;
    data: graphData;
  };
  cloud: string;
  grass: {
    startDate: string;
    endDate: string;
    values: grassValues | [];
  };
}
