import { Icon, type IconProps } from "./Icon";

export function PersonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M10 9C12.7614 9 15 11.2386 15 14H13C13 12.3431 11.6569 11 10 11H6C4.34315 11 3 12.3431 3 14H1C1 11.2386 3.23858 9 6 9H10Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 1C9.933 1 11.5 2.567 11.5 4.5C11.5 6.433 9.933 8 8 8C6.067 8 4.5 6.433 4.5 4.5C4.5 2.567 6.067 1 8 1ZM8 3C7.17157 3 6.5 3.67157 6.5 4.5C6.5 5.32843 7.17157 6 8 6C8.82843 6 9.5 5.32843 9.5 4.5C9.5 3.67157 8.82843 3 8 3Z"
        fill="currentColor"
      />{" "}
    </Icon>
  );
}
