import * as auth from './auth';
import * as profile from './profile';
import * as createComplaintBox from './createComplaintBox';
import * as createComplaint from './createComplaint';
import * as events from './events';
import * as emailOtp from './emailOtp';
export default {
    ...auth,
    ...profile,
    ...createComplaintBox,
    ...createComplaint,
    ...events,
    ...emailOtp
}