import { Rate, RateProps } from "antd";

interface PinProps extends RateProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...rest } = props;

  return (
    <Rate
      {...rest}
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => {
        console.log(num);
        onCheckedChange?.(!!num);
      }}
    />
  );
};
