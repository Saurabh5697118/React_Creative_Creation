export const GetBgColors = async () => {
  const response = await fetch(
    "https://random-flat-colors.vercel.app/api/random?count=5"
  );
  const { colors } = await response.json();
  return colors;
};
