let access: string | null = null;

export const authService = {
    getToken: () => {
        if (!access) {
            access = localStorage.getItem("access");
        }
        return access;
    },
    setToken: (access: string | null) => {
        access = access;
        if (access) {
            localStorage.setItem("access", access)
        } else {
            localStorage.removeItem("access")
        }
    },
    clear: () => {
        access = null;
        localStorage.removeItem("access")
    },
};

let userId: string | null = localStorage.getItem("userId")

export const userService = {
    get: async (): Promise<string | null> => {
        userId = localStorage.getItem("userId");
        return userId;
    },
    set: async (pk: string | null): Promise<void> => {
        userId = pk;
        if (pk) {
            localStorage.setItem("userId", pk);
        } else {
            localStorage.removeItem("userId");
        }
    },
    clear: async (): Promise<void> => {
        userId = null;
        localStorage.removeItem("userId");
    },
};