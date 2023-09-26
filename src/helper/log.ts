export function debugConsole(
  message: string,
  type: "error" | "warning" | "info" = "info"
) {
  if (process.env.NODE_ENV !== "development") return;
  switch (type) {
    case "error":
      return console.error(message);
    case "warning":
      return console.warn(message);
    default:
      return console.log(message);
  }
}
