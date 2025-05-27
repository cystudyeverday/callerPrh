import { Row } from '@/component/ui';
import React from 'react'
import { Statistic, Card } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

const StatisticsBar = () => {
  return (
    <Row className='h-[100px] gap-2 mt-2'>
      <Card >
        <Statistic
          title="Total caller"
          value={50}
          className='w-[200px]'
        // className='border border-gray-400 rounded'
        />
      </Card>
      <Card >
        <Statistic
          title="Total target "
          value={13889}
          className='w-[200px]'
        // className='border border-gray-400 rounded'
        />
      </Card>
      <Card >
        <Statistic
          title="Total finsihed "
          value={12389}
          className='w-[200px]'
        // className='border border-gray-400 rounded'
        />
      </Card>
      <Card >
        <Statistic
          title="Total rate "
          className='w-[200px]'
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          suffix="%"
        // className='border border-gray-400 rounded'
        />
      </Card>
    </Row>
  );
}

export default StatisticsBar;