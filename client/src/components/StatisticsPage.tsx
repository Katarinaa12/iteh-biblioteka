import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useStatistics } from '../hooks/apiHooks'
import { DatePicker } from '@mui/x-date-pickers';
import { useSearchParams } from 'react-router-dom';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Sector, PieChart, Pie } from 'recharts';

export default function StatisticsPage() {
    const { data: incomeData } = useStatistics('/api/subscriptions-income');
    const { data: summaryData } = useStatistics('/api/subscriptions-summary');
    const [urlSearchParams, setSearchParmas] = useSearchParams();
    const from = urlSearchParams.get('from');
    const to = urlSearchParams.get('to');
    const [activeIndex, setActiveIndex] = useState(0);

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Number of subscriptions: ${value}`}</text>
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    return (
        <Container sx={{ padding: 2 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: 2

            }}>
                <DatePicker label='From' onChange={val => {
                    urlSearchParams.set('from', val?.toISOString().slice(0, 10) || '');
                    setSearchParmas(urlSearchParams)
                }} value={from ? new Date(from) : null} />
                <DatePicker label='To' onChange={val => {
                    urlSearchParams.set('to', val?.toISOString().slice(0, 10) || '');
                    setSearchParmas(urlSearchParams)
                }} value={to ? new Date(to) : null} />
            </Box>
            <Typography
                variant='h5'
                sx={{
                    padding: 2,
                    textAlign: 'center'
                }}
            >Income statistics</Typography>
            <ResponsiveContainer width="100%" aspect={2.5}>
                <BarChart
                    data={incomeData}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <Typography
                variant='h5'
                sx={{
                    padding: 2,
                    textAlign: 'center'
                }}
            >Subscriptions by statuses</Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ResponsiveContainer width="30%" aspect={1}>
                    <PieChart width={400} height={400}>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={summaryData.map((element: any) => {
                                return {
                                    name: element.status,
                                    value: element.total
                                }
                            })}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={(_, index) => setActiveIndex(index)}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Container>
    )
}
