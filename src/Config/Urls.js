
// Production 
// export const IP_ADDRESS = 'https://your-production-domain.com';

// Development
export const IP_ADDRESS = 'http://192.168.101.12:4000';

// IP merged base url (for onrender)
export const API_BASE_URL = `${IP_ADDRESS}/api/villagevoice`;

// API url using helper function
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// API endpoints
export const LOGIN_API = getApiUrl('/auth/login');
export const SIGN_UP_API = getApiUrl('/auth/register');
export const LOGOUT_API = getApiUrl('/auth/logout');
export const UPDATE_PROFILE_API = getApiUrl('/profile/update');
export const UPDATE_PROFILE_IMAGE_API = getApiUrl('/profile/update/image');
export const CHANGE_PASSWORD_API = getApiUrl('/profile/changePassword');
export const CHANGE_THEME_API = getApiUrl('/profile/changeTheme');
export const HELP_API = getApiUrl('/help');
export const POLICIES_API = getApiUrl('/policies');
export const REPORT_PROBLEM_API = getApiUrl('/reportProblem');
export const VIEW_PROFILE_API = getApiUrl('/profile/view');
export const CHANGE_LANGUAGE_API = getApiUrl('/profile/changeLanguage');
export const CREATE_COMPLAINT_BOX = getApiUrl('/create/complaintbox');
export const UPDATE_COMPLAINT_BOX = getApiUrl('/update/complaintbox');
export const GET_ALL_COMPLAINT_BOX = getApiUrl('/getAll/complaintbox');
export const CREATE_USER_COMPLAINT = getApiUrl('/create-user/complaint');
export const GET_ALL_USER_COMPLAINT = getApiUrl('/getAll-user/complaint');
export const GET_SINGLE_USER_COMPLAINT = getApiUrl('/getSingle-user/complaint');
export const GET_SINGLE_COMPLAINT = getApiUrl('/getSingle-complaint/');
export const CREATE_EVENT = getApiUrl('/event/add-event');
export const REMOVE_EVENT = getApiUrl('/event/delete-event/');
export const GET_ALL_EVENTS = getApiUrl('/event/getAll-event');
export const UPDATE_USER_COMPLAINT = getApiUrl('/update-user/complaint');
export const REMOVE_USER_COMPLAINT = getApiUrl('/remove-user/complaint/');
export const SEND_OTP = getApiUrl('/send/otp');
export const VERIFY_OTP = getApiUrl('/verify/otp');
export const FORGOT_PASSWORD = getApiUrl('/forgot/password');

// Schemes Endpoints
export const CREATE_SCHEME_API = getApiUrl('/create/scheme');
export const UPDATE_SCHEME_API = getApiUrl('/update/scheme');
export const GET_ALL_SCHEMES_API = getApiUrl('/getAll/scheme');
export const REMOVE_SCHEME_API = getApiUrl('/remove/scheme/');

// Polls Endpoints
export const CREATE_POLL_API = getApiUrl('/create/poll');
export const GET_ALL_POLLS_API = getApiUrl('/getAll/poll');
export const VOTE_POLL_API = getApiUrl('/vote/poll');
export const REMOVE_POLL_API = getApiUrl('/remove/poll/');

// Notifications Endpoints
export const GET_NOTIFICATIONS_API = getApiUrl('/notifications');
export const GET_UNREAD_NOTIFICATIONS_COUNT_API = getApiUrl('/notifications/unread-count');
export const MARK_NOTIFICATION_READ_API = getApiUrl('/notifications/mark-read/');
export const MARK_ALL_NOTIFICATIONS_READ_API = getApiUrl('/notifications/mark-all-read');