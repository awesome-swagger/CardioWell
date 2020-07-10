import React, { PureComponent } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip, Legend, } from 'recharts';
import Title from './Title';
import moment from 'moment-timezone';
import 'moment/locale/fr';



class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10}  textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
      </g>
    );
  }
}

export default function Chart3(props) {
  const theme = useTheme();

  var dataArray = props.data.reverse()
  var timeZone = props.timeZone
  var data = []
  for (var i =0; i<dataArray.length; i++) {
    var taken = moment(dataArray[i]._created_at).tz(timeZone).format('MM/DD/YY');
    var obj = {
      date: taken,
      Weight: (((parseFloat(dataArray[i].weight)/100*22046)/100)/100/10).toFixed(2)
        }
    data.push(obj)
  }
  return (
    <React.Fragment>
      <Title>Weight Trend</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} >

            </XAxis>
          <YAxis stroke={theme.palette.text.secondary} domain={[0, 300]}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              lbs
            </Label>
          </YAxis>
          <Tooltip />
          <Legend iconType="rect" />
          <Line type="monotone" dataKey="Weight" stroke="#3F51B5"  dot={{ stroke: '#3F51B5', strokeWidth: 2, fill: '#3F51B5' }} label={<CustomizedLabel />} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}