
import './App.css';
import { FlightTable } from './components/FlightTable';
import { Box } from '@mui/material';

function App() {
 return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Flight schedule</h1>
      <div style={{ width: '60%' }}>
        <FlightTable />
      </div>
    </div>
  );  
}

export default App;
