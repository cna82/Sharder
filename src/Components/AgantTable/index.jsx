
"use client";
//imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import agentData from '@/lib/data/agentData';

const theme = createTheme({
  typography: {
    fontFamily: 'Vazir, sans-serif',
  },
});
export const viewport = {
  content: "width=device-width, initial-scale=1"
}

// Agent table comp 
const AgentTable = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          style={{
            width: '100%',
            backgroundColor: '#e5e7eb',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            willChange: 'transform',
            padding: '0 16px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Vazir, sans-serif',
              fontWeight: 'bold',
              fontSize: '1.6rem',
              textAlign: 'center',
              padding: '24px 0',
              color: '#0f172a',
            }}
          >
            لیست نمایندگی‌ های شاردر
          </h2>

          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: '#f3f4f6',
              boxShadow: 'none',
              minWidth: 650,
              border: '1px solid #e0e0e0',
              borderRadius: '1rem',
              fontFamily: 'Vazir, sans-serif',
            }}
          >
            <Table
              sx={{
                borderCollapse: 'separate',
                borderSpacing: 0,
                minWidth: 800,
              }}
              aria-label="agent table"
            >
              <TableHead>
                <TableRow>
                  {['استان', 'شهر', 'نام نماینده', 'تلفن', 'آدرس'].map(
                    (header, idx) => (
                      <TableCell
                        key={header}
                        sx={{
                          backgroundColor: '#e0f2fe',
                          color: '#0f172a',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          borderBottom: '2px solid #bae6fd',
                          borderRight:
                            idx < 4 ? '1px solid #cbd5e1' : 'none',
                          fontFamily: 'Vazir, sans-serif',
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {agentData.map((agent) => (
                  <TableRow
                    key={agent.id}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: '#EEEEEE' },
                      '&:hover': { backgroundColor: '#dfedf7', cursor: 'pointer' },
                    }}
                  >
                    {[
                      agent.province,
                      agent.city,
                      agent.agentName,
                      agent.phone,
                      agent.address,
                    ].map((value, idx) => (
                      <TableCell
                        key={idx}
                        align="center"
                        sx={{
                          whiteSpace: idx === 4 ? 'normal' : 'nowrap',
                          textOverflow:
                            idx === 4 ? 'initial' : 'ellipsis',
                          overflow: idx === 4 ? 'visible' : 'hidden',
                          borderRight:
                            idx < 4 ? '1px solid #e0e0e0' : 'none',
                          maxWidth: idx === 4 ? 'none' : 200,
                          fontFamily: 'Vazir, sans-serif',
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default AgentTable;