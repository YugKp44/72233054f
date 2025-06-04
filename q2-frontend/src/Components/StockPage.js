import React, { useState, useEffect } from 'react';
import { getStockData } from '../api/stockService'; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Box, Typography, CircularProgress, Paper, Container, Alert, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';


const MANUAL_STOCKS = {
    "Nvidia Corporation": "NVDA",
    "PayPal Holdings, Inc.": "PYPL",
    "Microsoft Corporation": "MSFT",
    "Alphabet Inc. Class A": "GOOGL",
    "Broadcom Inc.": "AVGO",
    "Tesla, Inc.": "TSLA",
    "Advanced Micro Devices, Inc.": "AMD",
    "CSX Corporation": "CSX"
};

const StockPage = () => {
    const [chartData, setChartData] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [ticker, setTicker] = useState('NVDA');
    const [minutes, setMinutes] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!ticker) return;

        let isMounted = true; // Prevent state updates on unmounted component
        const fetchAndSetStockData = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getStockData(ticker, minutes);
                
                if (isMounted) {
                    const formattedData = data.priceHistory.map(item => ({
                        ...item,
                        date: new Date(item.lastUpdatedAt),
                        time: new Date(item.lastUpdatedAt).toLocaleTimeString(),
                    })).sort((a,b) => a.date - b.date);

                    setChartData(formattedData);
                    setAveragePrice(data.averageStockPrice);
                }
            } catch (err) {
                if (isMounted) {
                    setError(`Failed to fetch data for ${ticker}.`);
                }
                console.error(err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        
        fetchAndSetStockData();

        // Cleanup function to run when the component unmounts or dependencies change
        return () => {
            isMounted = false;
        };
    }, [ticker, minutes]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Stock Price History
                </Typography>
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <FormControl sx={{ minWidth: 300 }}>
                        <InputLabel id="company-select-label">Company</InputLabel>
                        <Select
                            labelId="company-select-label"
                            value={ticker}
                            label="Company"
                            onChange={(e) => setTicker(e.target.value)}
                        >
                            {Object.entries(MANUAL_STOCKS).map(([name, symbol]) => (
                                <MenuItem key={symbol} value={symbol}>
                                    {name} ({symbol})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField 
                        label="Minutes" 
                        type="number" 
                        variant="outlined" 
                        value={minutes} 
                        onChange={(e) => setMinutes(Number(e.target.value))} 
                        sx={{width: 120}}
                    />
                </Box>

                {loading && <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>}
                {error && <Alert severity="error">{error}</Alert>}
                
                {!loading && !error && chartData.length > 0 && (
                    <>
                        <Typography variant="h6" align="center" gutterBottom>
                            {ticker} Average Price: ${averagePrice.toFixed(2)}
                        </Typography>
                        <ResponsiveContainer width="100%" height={450}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3}/>
                                <XAxis dataKey="time" />
                                <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="price" name={ticker} stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                                <ReferenceLine y={averagePrice} label={{ value: `Avg: ${averagePrice.toFixed(0)}`, position: "insideTopLeft" }} stroke="red" strokeDasharray="4 4" />
                            </LineChart>
                        </ResponsiveContainer>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default StockPage;