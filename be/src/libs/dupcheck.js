export const isDuplicate = async (Model, uniqueField, value) => {
  try {
    const existingRecord = await Model.exists({ [uniqueField]: value });
    return !!existingRecord; // true nếu có, false nếu không
  } catch (err) {
    console.error("Error checking duplicate:", err);
    throw err;
  }
};