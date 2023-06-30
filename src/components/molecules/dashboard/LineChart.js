import useDashboard from "@/data/useDashboard";
import { Loader, Card } from "@/components/atoms";
import { AutoSizer } from "react-virtualized";
import { Line } from "@nivo/line";

const LineChart = () => {
  const { dashboard, dashboardIsLoading } = useDashboard("line");

  return (
    <Card>
      <h1 className="text-xl font-bold">Line Chart</h1>
      <div className="h-96">
        {dashboardIsLoading && (
          <div className="w-full h-full items-center justify-center flex">
            <Loader />
          </div>
        )}
        {dashboard && (
          <AutoSizer>
            {({ width, height }) => (
              <Line
                width={width}
                height={height}
                data={dashboard.data}
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
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            )}
          </AutoSizer>
        )}
      </div>
    </Card>
  );
};

export default LineChart;
