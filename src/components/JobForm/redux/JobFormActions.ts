export const UPDATE_FIELD = 'UPDATE_FIELD';

export const updateField = (fieldName: string, value: any) => ({
    type: UPDATE_FIELD,
    fieldName,
    value,
});
