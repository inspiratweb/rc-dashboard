import { Icon, type IconProps } from "./Icon";

export function CalendarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M13 7H3V12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V7ZM13 4C13 3.44772 12.5523 3 12 3H4C3.44772 3 3 3.44772 3 4V5H13V4ZM15 12C15 13.6569 13.6569 15 12 15H4C2.34315 15 1 13.6569 1 12V4C1 2.34315 2.34315 1 4 1C4 0.447715 4.44772 0 5 0C5.55228 0 6 0.447715 6 1H10C10 0.447715 10.4477 0 11 0C11.5523 0 12 0.447715 12 1C13.6569 1 15 2.34315 15 4V12Z"
        fill="currentColor"
      />
    </Icon>
  );
}
