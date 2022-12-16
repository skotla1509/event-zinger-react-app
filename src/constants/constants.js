
export class Constants {
    static API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:1000';
}

export class UserRoles {
    static CUSTOMER = "CUSTOMER";
    static EVENT_MANAGER = "EVENT_MANAGER";
    static EVENT_MANAGER_PRO = "EVENT_MANAGER_PRO";
    static SYSTEM_ADMIN = "ADMINISTRATOR";
}

export class Gender {
    static MALE = "MALE";
    static FEMALE = "FEMALE";
    static PREFERRED_NOT_TO_SAY = "PREFERRED_NOT_TO_SAY";
}

export class Helper {
    static formatDate = (date) => {
        const dateObj = new Date(date + "T00:00:00Z");
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString("en-us", options);
    }

    static formatDateFromTimeStamp = (timeStamp) => {
        const dateObj = new Date(timeStamp);
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        return dateObj.toLocaleDateString("en-us", options);
    }

    static getRoleName = (role) => {
        switch (role) {
            case UserRoles.CUSTOMER: return "Customer";
            case UserRoles.EVENT_MANAGER: return "Event Manager";
            case UserRoles.SYSTEM_ADMIN: return "Administrator";
            default: return "NA";
        }
    }

    static getAvatarFromGender = (gender) => {
        if (gender === Gender.MALE) {
            return "male-avatar.png"
        }
        else {
            return "female-avatar.png"
        }
    }
}