export type graphLabels = string[];
export type graphData = number[];
export type grassValues = {
  count: number;
  date: string;
};

export type GraphDataType = {
  labels : graphLabels;
  data : graphData;
}

export interface GrassType {
  startDate : string;
  endDate : string;
  values :  grassValues | [] | any;
}
export interface DashInfo {
  graph: GraphDataType;
  cloud: string | undefined;
  grass: GrassType;
}
