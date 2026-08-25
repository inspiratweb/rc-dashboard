import { Icon, type IconProps } from "./Icon";

export function TooltipIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M8 7C8.55228 7 9 7.44772 9 8V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V8C7 7.44772 7.44772 7 8 7Z"
        fill="currentColor"
      />
      <path
        d="M8 4C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6C7.44772 6 7 5.55228 7 5C7 4.44772 7.44772 4 8 4Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 1C14.6569 1 16 2.34315 16 4V11C16 12.6569 14.6569 14 13 14H10.4141L9.41406 15C8.63303 15.7809 7.36697 15.7809 6.58594 15L5.58594 14H3C1.34315 14 0 12.6569 0 11V4C0 2.34315 1.34315 1 3 1H13ZM3 3C2.44772 3 2 3.44772 2 4V11C2 11.5523 2.44772 12 3 12H6.41406L8 13.5859L9.58594 12H13C13.5523 12 14 11.5523 14 11V4C14 3.44772 13.5523 3 13 3H3Z"
        fill="currentColor"
      />
    </Icon>
  );
}
