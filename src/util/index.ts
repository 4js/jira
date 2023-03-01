import { useState } from "react";
import { useEffect } from "react";
export const isFalse: (value: unknown) => boolean = (value) =>
  value === 0 ? true : !!value;

// 在一个函数里 改变传入的对象本身上是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (!isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: Function) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次value变化以后 开启一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每一次在上一个useEffect处理完以后运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
