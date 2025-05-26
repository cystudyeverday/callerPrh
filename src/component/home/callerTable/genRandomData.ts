function pad(num: number) {
  return num.toString().padStart(2, '0');
}

// 生成一个随机时间字符串，基于基准时间往前推
function randomTime(baseDate: any, offsetMinutes: any) {
  const d = new Date(baseDate.getTime() - offsetMinutes * 60000);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function genRandomData() {
  const data = [];
  const now = new Date();

  for (let i = 1; i <= 50; i++) {
    const targetNumber = Math.floor(Math.random() * 200) + 100; // 100~299
    const finishedNumber = Math.floor(Math.random() * targetNumber); // < targetNumber
    const workingTime = Math.floor(Math.random() * 10) + 3; // 3~12
    const triggerCount = Math.floor(Math.random() * 5) + 2; // 2~6 times
    const triggerTimes = [];

    let offset = 0;
    for (let j = 0; j < triggerCount; j++) {
      triggerTimes.push(randomTime(now, offset));
      offset += Math.floor(Math.random() * 90) + 20; // 每次往前推20~110分钟
    }
    const warningInfo = `+-${Math.floor(Math.random() * 5) + 1}`;


    data.push({
      order: i,
      triggerTimes,
      targetNumber,
      workingTime,
      finishedNumber,
      warningInfo
    });
  }

  return data;
}
