import { Icon, type IconProps } from "./Icon";

export function PaywallIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M10 10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H6C5.44772 12 5 11.5523 5 11C5 10.4477 5.44772 10 6 10H10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 1C12.6569 1 14 2.34315 14 4V12C14 13.6569 12.6569 15 11 15H5C3.34315 15 2 13.6569 2 12V4C2 2.34315 3.34315 1 5 1H11ZM5 3C4.44772 3 4 3.44772 4 4V12C4 12.5523 4.44772 13 5 13H11C11.5523 13 12 12.5523 12 12V4C12 3.44772 11.5523 3 11 3H5Z"
        fill="currentColor"
      />
    </Icon>
  );
}
