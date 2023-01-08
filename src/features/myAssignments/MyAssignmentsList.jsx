import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { appLangState, monthNamesState, refreshMyAssignmentsState } from '../../states/main';
import MyAssignmentsMonth from './MyAssignmentsMonth';
import { myAssignmentsState } from '../../states/schedule';

const MyAssignmentsList = () => {
  const monthNames = useRecoilValue(monthNamesState);
  const appLang = useRecoilValue(appLangState);
  const refresh = useRecoilValue(refreshMyAssignmentsState);
  const myAssignments = useRecoilValue(myAssignmentsState);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMyAssignments = async () => {
      setIsLoading(true);

      const tempData3 = myAssignments.reduce((group, assignment) => {
        const { month_value } = assignment;
        group[month_value] = group[month_value] ?? [];
        group[month_value].push(assignment);
        return group;
      }, {});

      const tempData4 = [];
      Object.keys(tempData3).forEach(function (key, index) {
        const months = [...tempData3[key]];
        const obj = {
          month_value: key,
          month_assignments: months.reverse(),
        };

        tempData4.push(obj);
      });

      setData(tempData4);
      setIsLoading(false);
    };

    getMyAssignments();
  }, [appLang, monthNames, myAssignments, refresh]);

  return (
    <Box>
      {isLoading && (
        <CircularProgress
          color="secondary"
          size={80}
          disableShrink={true}
          sx={{
            display: 'flex',
            margin: '10px auto',
          }}
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {!isLoading &&
          data.length > 0 &&
          data.map((monthData) => (
            <MyAssignmentsMonth monthData={monthData} key={`monthData-${monthData.month_value}`} />
          ))}
      </Box>
    </Box>
  );
};

export default MyAssignmentsList;
