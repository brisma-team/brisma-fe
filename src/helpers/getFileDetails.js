const getFileDetails = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response?.blob();

    const type = blob?.type;
    const size = blob?.size;

    return { type, size };
  } catch (error) {
    console.error("Gagal mengambil detail file:", error);
    return null;
  }
};

export default getFileDetails;
