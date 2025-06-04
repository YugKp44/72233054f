import React, { useState } from 'react';
import StockPage from './Components/StockPage';
import CorrelationHeatmap from './Components/CorrelationHeatmap';
import { Button, Box, AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css'; // Your global styles

// MUI Theme for consistent branding
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // A light blue, good for dark mode
    },
    secondary: {
      main: '#f48fb1', // A pink, for contrast
    },
    background: {
      default: '#121212', // Standard dark background
      paper: '#1e1e1e',   // Slightly lighter for paper elements
    },
  },
  typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
  }
});

function App() {
    const [activePage, setActivePage] = useState('stockPage'); // Default page

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* Applies baseline styles and dark mode background */}
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Stock Analysis Dashboard
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => setActivePage('stockPage')}
                            variant={activePage === 'stockPage' ? 'outlined' : 'text'}
                            sx={{ mr: 1 }} // Add some margin between buttons
                        >
                            Stock Page
                        </Button>
                        <Button
                            color="inherit"
                            onClick={() => setActivePage('heatmap')}
                            variant={activePage === 'heatmap' ? 'outlined' : 'text'}
                        >
                            Correlation Heatmap
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container component="main" sx={{ mt: 2, mb: 2 }}> {/* Added Container for consistent padding */}
                    {activePage === 'stockPage' ? <StockPage /> : <CorrelationHeatmap />}
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;