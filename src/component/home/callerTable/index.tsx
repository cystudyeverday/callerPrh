'use client';
import { Table } from 'antd';
import React from 'react'
import { genRandomData } from './genRandomData';
import { gencols } from './col';
const data = genRandomData();

const CallerTable = () => {
  const rowKey = ((record: any) => record?.order);
  const rowClassName = (record: any, index: number) => index % 2 !== 0 ? 'bg-[#f9f9f9]' : '';
  return (
    <Table
      dataSource={data}
      columns={gencols(data)}
      rowClassName={rowClassName}
      rowKey={rowKey}
      bordered
    />
  );
}

export default CallerTable;