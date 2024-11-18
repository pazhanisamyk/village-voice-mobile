export const API_BASE_URL = 'http://192.168.1.35:3000/api/villagevoice';

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint;

export const LOGIN_API = getApiUrl('/auth/login');
export const SIGN_UP_API = getApiUrl('/auth/register');
export const LOGOUT_API = getApiUrl('/auth/logout');
export const UPDATE_PROFILE_API = getApiUrl('/profile/update');
export const CHANGE_PASSWORD_API = getApiUrl('/profile/changePassword');
export const CHANGE_DARKMODE_API = getApiUrl('/profile/changeDarkmode');
export const HELP_API = getApiUrl('/help');
export const POLICIES_API = getApiUrl('/policies');
export const REPORT_PROBLEM_API = getApiUrl('/reportProblem');
export const VIEW_PROFILE_API = getApiUrl('/profile/view');
export const CHANGE_LANGUAGE_API = getApiUrl('/profile/changeLanguage');