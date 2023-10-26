import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const TOKEN_CREATION_TIME_KEY = "tokenCreationTime";
const TOKEN_VALIDATE_TIME = 25 * 60 * 1000;
const TOKEN_EXPIRATION_TIME = 30 * 60;
const TOKEN_EXPIRATION_TIME_DAYS = TOKEN_EXPIRATION_TIME / (60 * 60 * 24);
export const saveTokensToCookies = (token: string, refreshToken?: string) => {
  const options = { expires: TOKEN_EXPIRATION_TIME_DAYS };
  const currentTime = new Date().getTime();

  Cookies.set(TOKEN_KEY, token, options);
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, options);
  Cookies.set(TOKEN_CREATION_TIME_KEY, currentTime.toString(), options);
};

export const getTokensFromCookies = () => {
  const token = Cookies.get(TOKEN_KEY);
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

  return { token, refreshToken };
};

export const removeTokensFromCookies = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  Cookies.remove(TOKEN_CREATION_TIME_KEY);
};

export const isTokenValid = () => {
  const tokenCreationTime = Cookies.get(TOKEN_CREATION_TIME_KEY);

  if (!tokenCreationTime) return false;

  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - parseInt(tokenCreationTime);
  return (
    elapsedTime > TOKEN_VALIDATE_TIME &&
    elapsedTime < TOKEN_VALIDATE_TIME + 5 * 60 * 1000
  );
};
