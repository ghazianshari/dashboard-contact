import * as yup from 'yup';

export const clientCreateSchema = yup.object({
    name: yup.string().required('Name is required'),
    // !copilot can you please make so that the phone number should be a valid indonesian phone number format
    phone: yup.string().required('Phone is required').matches(/^(?:\+62|62|0)8[1-9][0-9]{6,10}$/, 'Phone number must be a valid Indonesian phone number'),
    email: yup
        .string()
        .email('Email format is invalid')
        .required('Email is required'),
    description: yup.string().nullable(),
});
