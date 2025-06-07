import axios from 'axios';


const BACKEND_URL = 'http://localhost:3001';


export const getStockData = async (ticker, minutes) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/stocks/${ticker}`, {
            params: {
                minutes,
                aggregation: 'average',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching stock data for ${ticker}:`, error);
        throw error;
    }
};


export const getCorrelationData = async (ticker1, ticker2, minutes) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/stockcorrelation`, {
            params: {
                ticker: [ticker1, ticker2],
                minutes,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching correlation for ${ticker1}-${ticker2}:`, error);
        throw error;
    }
};