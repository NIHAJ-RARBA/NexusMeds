import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Alert, Row, Col } from "reactstrap";

import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, Cell, Pie, PieChart } from 'recharts';

const MonthlyRevenueBarChart = ({ data, width, height }) => {
    if (!data || !data.monthlyRevenue) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    // Format the month start dates
    const formattedData = data.monthlyRevenue.map(item => ({
        ...item,
        date: format(new Date(item['Month Start Date']), 'MMM yyyy'),
    })).reverse();

    return (
        <BarChart width={width} height={height} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Monthly Revenue" fill="#82ca9d" animationBegin={500} />
        </BarChart>
    );
};

const WeeklyRevenueBarChart = ({ data, width, height }) => {
    if (!data || !data.weeklyRevenue) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    // Format the week start dates
    const formattedData = data.weeklyRevenue.map(item => ({
        ...item,
        date: format(new Date(item['Week Start Date']), 'dd MMM yyyy'),
    })).reverse();

    return (
        <BarChart width={width} height={height} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Weekly Revenue" fill="#ff7300" animationBegin={500} />
        </BarChart>
    );
};

const MonthlyOrdersChart = ({ data, width, height }) => {
    if (!data || !data.monthlyOrders) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    // Format the month start dates
    const formattedData = data.monthlyOrders.map(item => ({
        ...item,
        date: format(new Date(item['Month Start Date']), 'MMM yyyy'),
    })).reverse();

    const maxMonthlyOrders = Math.max(...formattedData.map(item => parseInt(item['Monthly Orders'])));

    return (
        <LineChart width={width} height={height} data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, maxMonthlyOrders + 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Monthly Orders" stroke="#8884d8" dot={{ stroke: '#8884d8', fill: '#8884d8' }} animationBegin={500} connectNulls />
        </LineChart>
    );
};



const WeeklyOrdersChart = ({ data, width, height }) => {
    if (!data || !data.weeklyOrders) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    // Format the week start dates
    const formattedData = data.weeklyOrders.map(item => ({
        ...item,
        date: format(new Date(item['Week Start Date']), 'MMM dd'),
    })).reverse();

    const maxWeeklyOrders = Math.max(...formattedData.map(item => parseInt(item['WEEKLY ORDERS'])));

    return (
        <LineChart width={width} height={height} data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, maxWeeklyOrders + 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="WEEKLY ORDERS" stroke="#82ca9d" dot={{ stroke: '#8884d8', fill: '#82ca9d' }} animationBegin={200} connectNulls />
        </LineChart>
    );
};

const TotalRevenueChart = ({ data, width, height }) => {
    if (!data || !data.totalMedREvenue || !data.totalChemRevenue) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    const totalMedRevenue = parseFloat(data.totalMedREvenue['Total MED Revenue']);
    const totalChemRevenue = parseFloat(data.totalChemRevenue['Total CHEM Revenue']);
    const totalRevenue = totalMedRevenue + totalChemRevenue;

    const chartData = [
        { name: 'Total MED Revenue', value: totalMedRevenue },
        { name: 'Total CHEM Revenue', value: totalChemRevenue }
    ];

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={Math.min(width, height) / 2 - 10}
                fill="#8884d8"
                label
                animationBegin={0}
                animationDuration={1000}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
                ))}
            </Pie>
            <Tooltip />
            <Legend
                verticalAlign="bottom"
                height={10}
                iconSize={18}
                iconType="square"
            />
        </PieChart>
    );
};


const MostOrderingChart = ({ data, width, height, type }) => {
    if (!data || !type) {
        return <div>No data available</div>;
    }

    let chartData = [];

    if (type === 'customers' && data.mostOrderingCustomers) {
        chartData = data.mostOrderingCustomers.map((item, index) => ({
            name: item['Most ORDERING Customers'],
            orders: parseInt(item['Total Orders']),
            color: index % 2 === 0 ? '#82ca9d' : '#8884d8'
        }));
    } else if (type === 'researchers' && data.mostOrderingResearchers) {
        chartData = data.mostOrderingResearchers.map((item, index) => ({
            name: item['Most ORDERING Researchers'],
            orders: parseInt(item['Total Orders']),
            color: index % 2 === 0 ? '#82ca9d' : '#8884d8'
        }));
    }

    const maxOrders = Math.max(...chartData.map(data => data.orders));

    return (
        <BarChart width={width} height={height} data={chartData} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, maxOrders + 3]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
    );
};


const BarChartDataComponent = ({ data, titleKey, valueKey, width, height, color }) => {
    if (!data) {
        return null;
    }

    const chartData = data.map(item => ({
        name: item[titleKey],
        value: parseFloat(item[valueKey])
    }));

    const max = Math.max(...chartData.map(item => item.value));

    return (
        <BarChart width={width} height={height} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, max + max * 0.2]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={color} />
        </BarChart>
    );
};

const MostSpendingCustomersChart = ({ data, width, height }) => {
    return (
        <BarChartDataComponent
            data={data}
            titleKey="MOST SPENDING CUSTOMERS"
            valueKey="Spent Amount"
            width={width}
            height={height}
            color="#82ca9d"
        />
    );
};

const MostSpendingResearchersChart = ({ data, width, height }) => {
    return (
        <BarChartDataComponent
            data={data}
            titleKey="MOST SPENDING RESEARCHERS"
            valueKey="Spent Amount"
            width={width}
            height={height}
            color="#8884d8"
        />
    );
};


const MostActiveCustomersList = ({ data }) => {
    if (!data) {
        // If data is undefined, return a placeholder or null
        return null;
    }
    return (
        <div className="most-active-list">
            <h3>Most Active Customers</h3>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item['Most Active Customers']}</li>
                ))}
            </ul>
        </div>
    );
};

const MostActiveResearchersList = ({ data }) => {
    if (!data) {
        // If data is undefined, return a placeholder or null
        return null;
    }
    return (
        <div className="most-active-list">
            <h3>Most Active Researchers</h3>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item['Most Active Researchers']}</li>
                ))}
            </ul>
        </div>
    );
};

const RecentUsersChart = ({ data, width, height }) => {
    if (!data || !data.customersPastWeek || !data.customersPastMonth || !data.researchersPastWeek || !data.researchersPastMonth) {
        // Return null or display a message indicating that the data is not available
        return null;
    }

    const newData = [
        {
            name: 'Customers',
            pastWeek: parseInt(data.customersPastWeek['Weekly Customers']),
            pastMonth: parseInt(data.customersPastMonth['Monthly Customers'])
        },
        {
            name: 'Researchers',
            pastWeek: parseInt(data.researchersPastWeek['Weekly Researchers']),
            pastMonth: parseInt(data.researchersPastMonth['Monthly Researchers'])
        }
    ];

    return (
        <BarChart width={width} height={height} data={newData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pastWeek" fill="#8884d8" name="Past Week" />
            <Bar dataKey="pastMonth" fill="#82ca9d" name="Past Month" />
        </BarChart>
    );
};



const SalesData = ({ data, width, height }) => {
    const mostSoldMedicines = data.mostSoldMedicines;
    const mostSoldChemicals = data.mostSoldChemicals;

    if (!mostSoldMedicines || !mostSoldChemicals || !data.inStockMedCount || !data.outOfStockMedCount || !data.inStockChemCount || !data.outOfStockChemCount) {
        return null;
    }

    const styles = {
        tableHeader: {
            padding: '8px',
            textAlign: 'center',
            borderBottom: '1px solid #ddd',
        },
        tableCell: {
            padding: '8px',
            borderBottom: '1px solid #ddd',
        },
    };

    // Data for most sold medicines bar chart
    const mostSoldMedicinesData = mostSoldMedicines.map(item => ({
        name: item['Most Sold Medicine'],
        soldAmount: parseInt(item['Total Sold AMOUNT']),
        revenue: parseFloat(item['Total Revenue'])
    }));

    // Data for most sold chemicals bar chart
    const mostSoldChemicalsData = mostSoldChemicals.map(item => ({
        name: item['Most Sold Chemical'],
        soldAmount: parseInt(item['Total Sold AMOUNT']),
        revenue: parseFloat(item['Total Revenue'])
    }));

    // Data for in-stock and out-of-stock counts table
    const inStockMedCount = parseInt(data.inStockMedCount['IN STOCK MEDS']);
    const outOfStockMedCount = parseInt(data.outOfStockMedCount['OUT OF STOCK MEDS']);
    const inStockChemCount = parseInt(data.inStockChemCount['IN STOCK CHEMICALS']);
    const outOfStockChemCount = parseInt(data.outOfStockChemCount['OUT OF STOCK CHEMICALS']);

    // Colors for bars in charts
    const colors = ['#8884d8', '#82ca9d'];

    return (
        <div>
            <div>
                <Alert>Most Sold Medicines</Alert>
                <BarChart width={width} height={height} data={mostSoldMedicinesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="soldAmount" fill={colors[0]} name="Sold Amount" />
                    <Bar dataKey="revenue" fill={colors[1]} name="Total Revenue" />
                </BarChart>
            </div>
            <div>
                <Alert>Most Sold Chemicals</Alert>
                <BarChart width={width} height={height} data={mostSoldChemicalsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="soldAmount" fill={colors[0]} name="Sold Amount" />
                    <Bar dataKey="revenue" fill={colors[1]} name="Total Revenue" />
                </BarChart>
            </div>
            <div>
                <Alert>In-stock and Out-of-stock Counts</Alert>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={styles.tableHeader}>Category</th>
                            <th style={styles.tableHeader}>In Stock</th>
                            <th style={styles.tableHeader}>Out of Stock</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#dee2e6' }}>
                        <tr>
                            <td style={styles.tableCell}>Medicines</td>
                            <td style={styles.tableCell}>{inStockMedCount}</td>
                            <td style={styles.tableCell}>{outOfStockMedCount}</td>
                        </tr>
                        <tr>
                            <td style={styles.tableCell}>Chemicals</td>
                            <td style={styles.tableCell}>{inStockChemCount}</td>
                            <td style={styles.tableCell}>{outOfStockChemCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const STATISTICS = () => {
    const [data, setData] = useState({});
    const [selectedGroup, setSelectedGroup] = useState(null);

    const getAllStats = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/get-stats`, {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            console.log(parseRes);
            setData(parseRes);

        } catch (err) {
            console.error(err.message);
        }
    }

    const handleGroupButtonClick = (group) => {
        setSelectedGroup(group);
    };


    useEffect(() => {
        getAllStats();
    }, []);


    return (
        <Container>
            <div style={{ marginTop: '115px' }}></div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
                <Button color="primary" onClick={() => handleGroupButtonClick('orders')}>Orders</Button>
                <Button color="success" onClick={() => handleGroupButtonClick('revenue')} style={{ marginLeft: '20px' }}>Revenue</Button>
                <Button color="info" onClick={() => handleGroupButtonClick('customers')} style={{ marginLeft: '20px' }}>Customers</Button>
                <Button color="warning" onClick={() => handleGroupButtonClick('spending')} style={{ marginLeft: '20px' }}>Spending</Button>
                <Button color="secondary" onClick={() => handleGroupButtonClick('activity')} style={{ marginLeft: '20px' }}>Activity</Button>
                <Button color="dark" onClick={() => handleGroupButtonClick('sales')} style={{ marginLeft: '20px' }}>Sales Data</Button>
            </div>


            {selectedGroup === null && (
                    <Alert color="warning" style={{fontSize: '40px', marginTop: '100px'}}>Select a group to view statistics</Alert>
            )}

            {selectedGroup === 'orders' && (
                // Render components related to orders
                <div>
                    {/* Render Monthly OrdersChart and Weekly OrdersChart components */}
                    <div style={{ display: 'flex', width: '100%', height: 'auto', flexWrap: 'wrap', paddingLeft: '0px' }}>
                        <div style={{ flex: '1', height: '100%', marginLeft: '-50px', minWidth: '50%', paddingLeft: '0px' }}>
                            <Alert color="primary">Monthly Orders</Alert>
                            <MonthlyOrdersChart data={data} width={window.innerWidth / 2.4 - 50} height={window.innerWidth / 4.4 - 50} />
                        </div>
                        <div style={{ flex: '1', height: '100%', minWidth: '50%', paddingLeft: '20px' }}>
                            <Alert color="primary">Weekly Orders</Alert>
                            <WeeklyOrdersChart data={data} width={window.innerWidth / 2.4 - 50} height={window.innerWidth / 4.4 - 50} />
                        </div>
                    </div>
                </div>
            )}

            {selectedGroup === 'revenue' && (
                // Render components related to revenue
                <div>
                    {/* Render TotalRevenueChart, MonthlyRevenueBarChart, and WeeklyRevenueBarChart components */}

                    <div style={{ display: 'flex', width: '100%', height: 'auto', flexWrap: 'wrap', paddingLeft: '0px', paddingTop: '20px' }}>
                        <div style={{ flex: '1', height: '100%', minWidth: '20%', paddingLeft: '0px', paddingRight: '40px' }}>
                            <Alert color="success">Total Revenue</Alert>
                            <TotalRevenueChart data={data} width={window.innerWidth / 2.9 - 40} height={window.innerWidth / 4.4 - 40} />
                        </div>
                        <div style={{ flex: '1', height: '100%', minWidth: '30%', paddingLeft: '10px' }}>
                            <Alert color="success">Monthly Revenue</Alert>
                            <MonthlyRevenueBarChart data={data} width={window.innerWidth / 3.5 - 10} height={window.innerWidth / 4 - 40} />
                        </div>
                        <div style={{ flex: '1', height: '100%', minWidth: '30%', paddingLeft: '10px' }}>
                            <Alert color="success">Weekly Revenue</Alert>
                            <WeeklyRevenueBarChart data={data} width={window.innerWidth / 3.5 - 10} height={window.innerWidth / 4 - 40} />
                        </div>
                    </div>
                </div>
            )}

            {selectedGroup === 'customers' && (
                // Render components related to customers
                <div>
                    {/* Render MostOrderingChart for customers */}


                    <div style={{ display: 'flex', width: '100%', height: 'auto', flexWrap: 'wrap', paddingLeft: '0px', paddingTop: '20px' }}>
                        <div style={{ flex: '1', height: '100%', minWidth: '50%', paddingLeft: '0px' }}>
                            <Alert color="info">Most Ordering Customers</Alert>
                            <MostOrderingChart data={data} width={window.innerWidth / 2.5 - 0} height={window.innerWidth / 4.5 - 0} type="customers" />
                        </div>
                        <div style={{ flex: '1', height: '100%', minWidth: '50%', paddingLeft: '60px' }}>
                            <Alert color="info">Most Ordering Researchers</Alert>
                            <MostOrderingChart data={data} width={window.innerWidth / 2.5 - 60} height={window.innerWidth / 4.5 - 0} type="researchers" />
                        </div>
                    </div>
                </div>
            )}

            {selectedGroup === 'spending' && (
                // Render components related to spending
                <div>
                    {/* Render MostSpendingCustomersChart and MostSpendingResearchersChart components */}



                    <div style={{ display: 'flex', width: '100%', height: 'auto', flexWrap: 'wrap', paddingLeft: '0px' }}>
                        <div style={{ flex: '1', height: '100%', marginLeft: '-50px', minWidth: '50%', paddingLeft: '0px' }}>
                            <Alert color="warning">Most Spending Customers</Alert>
                            <MostSpendingCustomersChart data={data.mostSpendingCustomers} width={window.innerWidth / 2.5 - 50} height={window.innerWidth / 4.5 - 50} />
                        </div>
                        <div style={{ flex: '1', height: '100%', minWidth: '50%', paddingLeft: '100px' }}>
                            <Alert color="warning">Most Spending Researchers</Alert>
                            <MostSpendingResearchersChart data={data.mostSpendingResearchers} width={window.innerWidth / 2.5 - 100} height={window.innerWidth / 4.5 - 50} />
                        </div>
                    </div>
                </div>
            )}

            {selectedGroup === 'activity' && (
                // Render components related to activity
                <div>
                    {/* Render MostActiveCustomersList, MostActiveResearchersList, and RecentUsersChart components */}


                    <Row>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                        width: '100%',
                        height: 'auto',
                        paddingTop: '20px',
                    }}>
                        <div style={{ minWidth: '50%', paddingLeft: '0px' }}>
                            <Alert color="dark">Recent User Activity</Alert>
                            <RecentUsersChart data={data} width={window.innerWidth / 2 - 0} height={window.innerWidth / 4 - 0} />
                        </div>
                    </div>
                        <Col md={6}>
                            <Alert color="secondary">Most Active Customers</Alert>
                            <MostActiveCustomersList data={data.mostActiveCustomers} />
                        </Col>
                        <Col md={6}>
                            <Alert color="secondary">Most Active Researchers</Alert>
                            <MostActiveResearchersList data={data.mostActiveResearchers} />
                        </Col>
                    </Row>


                </div>
            )}

            {selectedGroup === 'sales' && (
                // Render components related to sales data
                <div>
                    {/* Render SalesData component */}    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                        width: '100%',
                        height: 'auto',
                        paddingTop: '20px',
                        marginBottom: '20px'
                    }}>
                        <div style={{ minWidth: '50%', paddingLeft: '0px' }}>
                            <Alert color="danger">Sales Data</Alert>
                            <SalesData data={data} width={window.innerWidth / 2 - 0} height={window.innerWidth / 4 - 0} />
                        </div>
                    </div>
                </div>
            )}









        </Container>


    );
}

export default STATISTICS;