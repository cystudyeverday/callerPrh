import { capitalizeAndSpace } from "@/helpers";
import { Input, Button, } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs"; // 推荐用 dayjs 处理日期

export const generateColumnConfig = (config: any, data: any[]) => {
  const generateFilters = (data: any[], dataIndex: string) => {
    const uniqueValues = new Set(
      data?.map(item => item[dataIndex])?.filter(Boolean)
    );

    return Array.from(uniqueValues).map(value => ({
      text: config?.notFormatFilter
        ? value
        : capitalizeAndSpace(value),
      // : value,
      value: value
    }));
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      handleSearch
    }: any) => {
      const isDate = dataIndex?.toUpperCase()?.includes('DATE');
      return (
        <div style={{ padding: 8 }}>
          {
            isDate
              ? <DatePicker
                style={{ width: 188, marginBottom: 8, display: 'block' }}
                value={selectedKeys[0] ? dayjs(selectedKeys[0]) : null}
                onChange={(date, dateString) => {
                  setSelectedKeys(data ? [date?.format('YYYY-MM-DD')] : []);
                }}
                // onPressEnter={() => confirm()}
                allowClear
              />
              : <Input
                placeholder={isDate
                  ? 'YYYY-MM-DD'
                  : `Search value`
                }
                value={selectedKeys[0]}
                onChange={(e) => {
                  setSelectedKeys(e.target.value ? [e.target.value] : []);
                }}
                onPressEnter={() => {
                  confirm();
                }}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
              />
          }

          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            OK
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      )
    },
  });

  const baseConfig = {
    ellipsis: true,
    // sorter inlcudes different type data.
    sorter: config.sorter !== false && {
      compare: (a: any, b: any, sortOrder: any) => {
        // console.log(sortOrder)
        const aValue = a[config.dataIndex];
        const bValue = b[config.dataIndex];
        const isAEmpty = aValue === null
          || aValue === undefined
          || aValue === ''
          || Array.isArray(aValue) && aValue.length === 0;
        const isBEmpty = bValue === null
          || bValue === undefined
          || bValue === ''
          || Array.isArray(bValue) && bValue.length === 0;

        // 如果两个值都为空，则认为相等
        if (isAEmpty && isBEmpty) return 0;
        // 空值排序逻辑：空值永远排在后面，不受sortOrder影响
        if (sortOrder === 'ascend') {
          if (isAEmpty) return 1;  // a为空，排在后面
          if (isBEmpty) return -1; // b为空，排在后面
        } else if (sortOrder === 'ascend') {
          if (isAEmpty) return -1;  // a为空，排在后面
          if (isBEmpty) return 1; // b为空，排在后面
        }

        if (config.dataIndex.includes('Date')) {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          return dateA.getTime() - dateB.getTime();
        }
        if (typeof aValue === 'string') {

          return aValue.localeCompare(bValue);
        }
        if (typeof aValue === 'number') {
          return aValue - bValue;
        }
        if (Array.isArray(aValue)) {
          const aStr = aValue?.join('');
          const bStr = bValue?.join('');
          return aStr.localeCompare(bStr);
        }
      },
    },
    filters: config.autoGenerateFilters
      ? generateFilters(data, config.dataIndex)
      : config.filters,
    onFilter: config.onFilter || ((value: any, record: any) =>
      record[config.dataIndex]?.toString().toLowerCase().includes(value?.toLowerCase())
    ),
    ...(config.searchByValue && {
      ...getColumnSearchProps(config.dataIndex)
    })
  };

  return {
    ...baseConfig,
    ...config
  };
}

export const gencols = (data: any) => [
  generateColumnConfig({
    title: 'Order',
    dataIndex: 'order',
    width: 150
  }, data),
  {
    title: 'Trigger Times',
    dataIndex: 'triggerTimes',
    sortable: true,
    width: 400,
    render: (value: any) => value?.join(', ')
  },
  {
    title: 'Target Number',
    dataIndex: 'targetNumber',
    sortable: true,
    width: 200
  },
  {
    title: 'Working Time',
    dataIndex: 'workingTime',
    sortable: true,
    width: 200
  },
  {
    title: 'Finish number',
    dataIndex: 'finishedNumber',
    sortable: true,
    width: 200
  },
  {
    title: 'Warning',
    dataIndex: 'warningInfo',
    width: 200
  }
];