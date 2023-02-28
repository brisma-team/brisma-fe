import Main from "@/layouts/Main";
import {
	barChartSample,
	lineChartSample,
	pieChartSample,
	heatmapChartSample,
} from "@/constants/ChartSampleData";

import React from "react";
import { Card } from "flowbite-react";
import { Bar } from "@nivo/bar";
import { Pie } from "@nivo/pie";
import { Line } from "@nivo/line";
import { HeatMap } from "@nivo/heatmap";
import { AutoSizer } from "react-virtualized";

const breadcrumb = [
	{
		label: "Dashboard",
		current: true,
	},
];

export default function index() {
	return (
		<Main breadcrumb={breadcrumb}>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<Card>
					<h1 className="text-2xl font-bold">Bar Chart</h1>
					<div className="h-96">
						<AutoSizer>
							{({ height, width }) => (
								<Bar
									height={height}
									width={width}
									data={barChartSample}
									keys={[
										"hot dog",
										"burger",
										"sandwich",
										"kebab",
										"fries",
										"donut",
									]}
									indexBy="country"
									margin={{
										top: 50,
										right: 130,
										bottom: 50,
										left: 60,
									}}
									padding={0.3}
									valueScale={{ type: "linear" }}
									indexScale={{ type: "band", round: true }}
									colors={{ scheme: "nivo" }}
									defs={[
										{
											id: "dots",
											type: "patternDots",
											background: "inherit",
											color: "#38bcb2",
											size: 4,
											padding: 1,
											stagger: true,
										},
										{
											id: "lines",
											type: "patternLines",
											background: "inherit",
											color: "#eed312",
											rotation: -45,
											lineWidth: 6,
											spacing: 10,
										},
									]}
									fill={[
										{
											match: {
												id: "fries",
											},
											id: "dots",
										},
										{
											match: {
												id: "sandwich",
											},
											id: "lines",
										},
									]}
									borderColor={{
										from: "color",
										modifiers: [["darker", 1.6]],
									}}
									axisTop={null}
									axisRight={null}
									axisBottom={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "country",
										legendPosition: "middle",
										legendOffset: 32,
									}}
									axisLeft={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "food",
										legendPosition: "middle",
										legendOffset: -40,
									}}
									labelSkipWidth={12}
									labelSkipHeight={12}
									labelTextColor={{
										from: "color",
										modifiers: [["darker", 1.6]],
									}}
									legends={[
										{
											dataFrom: "keys",
											anchor: "bottom-right",
											direction: "column",
											justify: false,
											translateX: 120,
											translateY: 0,
											itemsSpacing: 2,
											itemWidth: 100,
											itemHeight: 20,
											itemDirection: "left-to-right",
											itemOpacity: 0.85,
											symbolSize: 20,
											effects: [
												{
													on: "hover",
													style: {
														itemOpacity: 1,
													},
												},
											],
										},
									]}
									role="application"
									ariaLabel="Nivo bar chart demo"
									barAriaLabel={function (e) {
										return (
											e.id +
											": " +
											e.formattedValue +
											" in country: " +
											e.indexValue
										);
									}}
								/>
							)}
						</AutoSizer>
					</div>
				</Card>
				<Card>
					<h1 className="text-2xl font-bold">Line Chart</h1>
					<div className="h-96">
						<AutoSizer>
							{({ width, height }) => (
								<Line
									width={width}
									height={height}
									data={lineChartSample}
									margin={{
										top: 50,
										right: 110,
										bottom: 50,
										left: 60,
									}}
									xScale={{ type: "point" }}
									yScale={{
										type: "linear",
										min: "auto",
										max: "auto",
										stacked: true,
										reverse: false,
									}}
									yFormat=" >-.2f"
									axisTop={null}
									axisRight={null}
									axisBottom={{
										orient: "bottom",
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "transportation",
										legendOffset: 36,
										legendPosition: "middle",
									}}
									axisLeft={{
										orient: "left",
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "count",
										legendOffset: -40,
										legendPosition: "middle",
									}}
									pointSize={10}
									pointColor={{ theme: "background" }}
									pointBorderWidth={2}
									pointBorderColor={{ from: "serieColor" }}
									pointLabelYOffset={-12}
									useMesh={true}
									legends={[
										{
											anchor: "bottom-right",
											direction: "column",
											justify: false,
											translateX: 100,
											translateY: 0,
											itemsSpacing: 0,
											itemDirection: "left-to-right",
											itemWidth: 80,
											itemHeight: 20,
											itemOpacity: 0.75,
											symbolSize: 12,
											symbolShape: "circle",
											symbolBorderColor:
												"rgba(0, 0, 0, .5)",
											effects: [
												{
													on: "hover",
													style: {
														itemBackground:
															"rgba(0, 0, 0, .03)",
														itemOpacity: 1,
													},
												},
											],
										},
									]}
								/>
							)}
						</AutoSizer>
					</div>
				</Card>
				<Card>
					<h1 className="text-2xl font-bold">Pie Chart</h1>
					<div className="h-96">
						<AutoSizer>
							{({ width, height }) => (
								<Pie
									width={width}
									height={height}
									data={pieChartSample}
									margin={{
										top: 40,
										right: 80,
										bottom: 80,
										left: 80,
									}}
									innerRadius={0.5}
									padAngle={0.7}
									cornerRadius={3}
									activeOuterRadiusOffset={8}
									borderWidth={1}
									borderColor={{
										from: "color",
										modifiers: [["darker", 0.2]],
									}}
									arcLinkLabelsSkipAngle={10}
									arcLinkLabelsTextColor="#333333"
									arcLinkLabelsThickness={2}
									arcLinkLabelsColor={{ from: "color" }}
									arcLabelsSkipAngle={10}
									arcLabelsTextColor={{
										from: "color",
										modifiers: [["darker", 2]],
									}}
									defs={[
										{
											id: "dots",
											type: "patternDots",
											background: "inherit",
											color: "rgba(255, 255, 255, 0.3)",
											size: 4,
											padding: 1,
											stagger: true,
										},
										{
											id: "lines",
											type: "patternLines",
											background: "inherit",
											color: "rgba(255, 255, 255, 0.3)",
											rotation: -45,
											lineWidth: 6,
											spacing: 10,
										},
									]}
									fill={[
										{
											match: {
												id: "ruby",
											},
											id: "dots",
										},
										{
											match: {
												id: "c",
											},
											id: "dots",
										},
										{
											match: {
												id: "go",
											},
											id: "dots",
										},
										{
											match: {
												id: "python",
											},
											id: "dots",
										},
										{
											match: {
												id: "scala",
											},
											id: "lines",
										},
										{
											match: {
												id: "lisp",
											},
											id: "lines",
										},
										{
											match: {
												id: "elixir",
											},
											id: "lines",
										},
										{
											match: {
												id: "javascript",
											},
											id: "lines",
										},
									]}
									legends={[
										{
											anchor: "bottom",
											direction: "row",
											justify: false,
											translateX: 0,
											translateY: 56,
											itemsSpacing: 0,
											itemWidth: 100,
											itemHeight: 18,
											itemTextColor: "#999",
											itemDirection: "left-to-right",
											itemOpacity: 1,
											symbolSize: 18,
											symbolShape: "circle",
											effects: [
												{
													on: "hover",
													style: {
														itemTextColor: "#000",
													},
												},
											],
										},
									]}
								/>
							)}
						</AutoSizer>
					</div>
				</Card>
				<Card>
					<h1 className="text-2xl font-bold">Heatmap Chart</h1>
					<div className="h-96">
						<AutoSizer>
							{({ width, height }) => (
								<HeatMap
									width={width}
									height={height}
									data={heatmapChartSample}
									margin={{
										top: 60,
										right: 90,
										bottom: 60,
										left: 90,
									}}
									valueFormat=">-.2s"
									axisTop={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: -90,
										legend: "",
										legendOffset: 46,
									}}
									axisRight={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "country",
										legendPosition: "middle",
										legendOffset: 70,
									}}
									axisLeft={{
										tickSize: 5,
										tickPadding: 5,
										tickRotation: 0,
										legend: "country",
										legendPosition: "middle",
										legendOffset: -72,
									}}
									colors={{
										type: "diverging",
										scheme: "red_yellow_blue",
										divergeAt: 0.5,
										minValue: -100000,
										maxValue: 100000,
									}}
									emptyColor="#555555"
									legends={[
										{
											anchor: "bottom",
											translateX: 0,
											translateY: 30,
											length: 400,
											thickness: 8,
											direction: "row",
											tickPosition: "after",
											tickSize: 3,
											tickSpacing: 4,
											tickOverlap: false,
											tickFormat: ">-.2s",
											title: "Value →",
											titleAlign: "start",
											titleOffset: 4,
										},
									]}
								/>
							)}
						</AutoSizer>
					</div>
				</Card>
			</div>
		</Main>
	);
}
