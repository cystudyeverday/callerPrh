import React from 'react'

const index = () => {
  return (
    <div>index</div>
  );


  function triggerEmitter(data: any, orderN: any) {

    function pad(num: number) {
      return num.toString().padStart(2, '0');
    }

    function getCurrentTimeString() {
      const now = new Date();
      return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    // 深拷贝数据，避免直接修改原数组
    const newData = data.map((item: any) => ({ ...item, triggerTimes: [...item.triggerTimes] }));
    const idx = newData.findIndex((item: any) => item.order === orderN);
    if (idx === -1) {
      console.warn(`未找到 order 为 ${orderN} 的数据`);
      return newData;
    }
    const item = newData[idx];

    // 新增当前时间到 triggerTimes（放最前面）
    item.triggerTimes.unshift(getCurrentTimeString());

    // finishedNumber + 1，但不能超过 targetNumber - 1
    if (item.finishedNumber < item.targetNumber - 1) {
      item.finishedNumber += 1;
    }

    // warning 变更（随机 "+-1" ~ "+-5"）
    item.warning = `+-${Math.floor(Math.random() * 5) + 1}`;

    return newData;
  }
}

export default index;