import { Col, ColorDot, Row } from '@/component/ui';
import React from 'react';
interface Props {
  type: string;
  num: number;
}
const NumberRec = ({ type, num }: Props) => {
  const typeMap: any = {
    completed: '#61B6C166',
    error: '#ED1C24',
    stopped: '#EB9F5766'
  };

  return (
    <Col className='h-full w-full border border-gray-light rounded p-3 pt-2 gap-2'>
      <Row className='gap-2 items-center'>
        <ColorDot
          color={typeMap[type] ?? '#dcdcdc'}
          width={16}
        />
        <div>{`Total ${type}`}</div>
      </Row>
      <div className='text-xl font-bold'>
        {num}
      </div>
    </Col>
  );
}

export default NumberRec;