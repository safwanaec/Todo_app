export const validateTitle = (title) => {
  if (!title || typeof title !== 'string') return false;
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= 50;
};

export const validateDescription = (description) => {
  if (description === undefined || description === null) return true;
  if (typeof description !== 'string') return false;
  return description.trim().length <= 200;
};
