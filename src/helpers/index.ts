export const isValidUrl = (url: any) => {
  try {
    const newUrl = new URL(url);

    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};
