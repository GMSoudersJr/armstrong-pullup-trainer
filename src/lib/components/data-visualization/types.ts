export type DayThreeChartData = {
	group: string;
	values: { name: string; value: number }[];
}[];

export type ChartData = number[] | DayThreeChartData | number;
