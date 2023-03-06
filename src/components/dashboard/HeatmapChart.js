import useDashboard from "@/data/useDashboard";
import Loader from "../Loader";

import React from "react";
import { Card } from "flowbite-react";
import { AutoSizer } from "react-virtualized";
import { HeatMap } from "@nivo/heatmap";

export default function HeatmapChart() {
	const { dashboard, dashboardIsLoading } = useDashboard("heatmap");

	return (
		<Card>
			<h1 className="text-2xl font-bold">Heatmap Chart</h1>
			<div className="h-96">
				{dashboardIsLoading && (
					<div className="w-full h-full items-center justify-center flex">
						<Loader />
					</div>
				)}
				{dashboard && (
					<AutoSizer>
						{({ width, height }) => (
							<HeatMap
								width={width}
								height={height}
								data={dashboard.data}
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
				)}
			</div>
		</Card>
	);
}
