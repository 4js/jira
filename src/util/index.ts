import { useRef, useState } from "react";
import { useEffect } from "react";
export const isFalse = (value: unknown) => (value === 0 ? true : !!value);
export const isVoid = (value: unknown) =>
  value === undefined || value == null || value === "";

// 在一个函数里 改变传入的对象本身上是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次value变化以后 开启一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每一次在上一个useEffect处理完以后运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialValue: T[]) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    setValue,
    clear: () => setValue([]),
    add: (item: T) => setValue([...value, item]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

export const useDocumentTitle = (title: string, keepUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepUnmount) {
        document.title = oldTitle;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
