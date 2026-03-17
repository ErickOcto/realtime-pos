import { AuthFormState } from "@/types/auth";

export const INITIAL_LOGIN_FORM = {
    email: "",
    password: "",
};

export const INITIAL_AUTH_LOGIN_FORM = {
    status: 'idle',
    errors: {
        email: [],
        password: [],
        _form: [],
    },
};

export const INITIAL_STATE_PROFILE = {
    id: "",
    name: "",
    role: "",
    avatar_url: "",

}