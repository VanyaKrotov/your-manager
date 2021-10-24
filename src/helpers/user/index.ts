export const createUsernameSymbols = (username: string) => {
  const parsed = username.split(" ");

  if (parsed.length === 1) {
    return (username[0] + username[1]).toUpperCase();
  }

  return parsed.slice(0, 2).join("").toUpperCase();
};
