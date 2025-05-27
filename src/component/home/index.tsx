import React from 'react'
import CallerTable from './callerTable';
import { Col } from '../ui';
import StatisticsBar from './statisticsBar';

const CallerHome = () => {
  return (
    <Col className='gap-2'>
      <StatisticsBar />
      <CallerTable />
    </Col>
  );
}

export default CallerHome;