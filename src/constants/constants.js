
export class Constants {
    static API_BASE = 'http://localhost:5000'; // process.env.REACT_APP_API_BASE;
}

export class UserRoles {
    static CUSTOMER = "CUSTOMER";
    static EVENT_MANAGER = "EVENT_MANAGER";
    static EVENT_MANAGER_PRO = "EVENT_MANAGER_PRO";
    static SYSTEM_ADMIN = "ADMINISTRATOR";
}

export class Helper {
    static formatDate = (date) => {
        const dateObj = new Date(date + "T12:00:00Z");
        return dateObj.toDateString();
    }
}