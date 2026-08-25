import { Icon, type IconProps } from "./Icon";

export function ChartBarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M13 11C13.5523 11 14 11.4477 14 12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H13Z"
        fill="currentColor"
      />
      <path
        d="M4 4C4.55228 4 5 4.44772 5 5V9C5 9.55228 4.55228 10 4 10C3.44772 10 3 9.55228 3 9V5C3 4.44772 3.44772 4 4 4Z"
        fill="currentColor"
      />
      <path
        d="M8 2C8.55228 2 9 2.44772 9 3V9C9 9.55228 8.55228 10 8 10C7.44772 10 7 9.55228 7 9V3C7 2.44772 7.44772 2 8 2Z"
        fill="currentColor"
      />
      <path
        d="M12 6C12.5523 6 13 6.44772 13 7V9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9V7C11 6.44772 11.4477 6 12 6Z"
        fill="currentColor"
      />
    </Icon>
  );
}
