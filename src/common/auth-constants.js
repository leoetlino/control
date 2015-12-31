export const AUTH_EVENTS = {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    logoutFailed: 'auth-logout-failed',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized',
    badRequest: 'auth-bad-request',
};

export const USER_ROLES = {
    all: '*',
    admin: 'admin',
    user: 'user',
    public: 'public',
};
