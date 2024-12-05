// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
import React, { Component } from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const data =
  [
    {
      "id": "japan",
      "color": "hsl(24, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 121
        },
        {
          "x": "helicopter",
          "y": 296
        },
        {
          "x": "boat",
          "y": 127
        },
        {
          "x": "train",
          "y": 229
        },
        {
          "x": "subway",
          "y": 224
        },
        {
          "x": "bus",
          "y": 116
        },
        {
          "x": "car",
          "y": 295
        },
        {
          "x": "moto",
          "y": 183
        },
        {
          "x": "bicycle",
          "y": 177
        },
        {
          "x": "horse",
          "y": 114
        },
        {
          "x": "skateboard",
          "y": 168
        },
        {
          "x": "others",
          "y": 141
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(322, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 148
        },
        {
          "x": "helicopter",
          "y": 216
        },
        {
          "x": "boat",
          "y": 278
        },
        {
          "x": "train",
          "y": 48
        },
        {
          "x": "subway",
          "y": 40
        },
        {
          "x": "bus",
          "y": 124
        },
        {
          "x": "car",
          "y": 144
        },
        {
          "x": "moto",
          "y": 176
        },
        {
          "x": "bicycle",
          "y": 28
        },
        {
          "x": "horse",
          "y": 55
        },
        {
          "x": "skateboard",
          "y": 146
        },
        {
          "x": "others",
          "y": 120
        }
      ]
    }
  ]

export default class Funnel extends Component {

  render() {
    return (
      <div style={{height:'500px'}}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    )
  }
}
