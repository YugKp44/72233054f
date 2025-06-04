import axios from 'axios';

// The base URL of your backend server, where all requests will be sent.
const BACKEND_URL = 'http://localhost:3001';

/**
 * Fetches the list of all stocks via our backend proxy to avoid CORS issues.
 * @returns {Promise<Object>} An object mapping company names to their ticker symbols.
 */
export const getAllStocks = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/all-stocks`);
        return response.data.stocks;
    } catch (error) {
        console.error("Error fetching the list of all stocks:", error);
        throw error;
    }
};

/**
 * Fetches the price history and average price for a single stock from your backend.
 * @param {string} ticker - The stock ticker (e.g., 'NVDA').
 * @param {number} minutes - The time frame in minutes.
 * @returns {Promise<Object>} The data from your backend API.
 */
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

/**
 * Fetches the correlation between two stocks from your backend.
 * @param {string} ticker1 - The first stock ticker.
 *
 * @param {string} ticker2 - The second stock ticker.
 * @param {number} minutes - The time frame in minutes.
 * @returns {Promise<Object>} The correlation data from your backend API.
 */
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