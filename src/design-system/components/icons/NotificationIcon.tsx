import { Icon, type IconProps } from "./Icon";

export function NotificationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M10 13C10 14.1046 9.10457 15 8 15C6.89543 15 6 14.1046 6 13H10Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 1C10.2174 1 12.0803 2.66726 12.3252 4.87109L12.8945 10H13C13.5523 10 14 10.4477 14 11C14 11.5129 13.6137 11.9345 13.1162 11.9922L13.1172 12H2.88281V11.9922C2.3858 11.9341 2 11.5126 2 11C2 10.4477 2.44772 10 3 10H3.10547L3.6748 4.87109C3.91974 2.66726 5.78259 1 8 1ZM8 3C6.80172 3 5.79455 3.90088 5.66211 5.0918L5.11719 10H10.8828L10.3379 5.0918C10.2055 3.90088 9.19828 3 8 3Z"
        fill="currentColor"
      />
    </Icon>
  );
}
