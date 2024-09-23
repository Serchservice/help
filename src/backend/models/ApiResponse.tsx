interface IApiResponse<T> {
    status: string
    code: number
    message: string
    data?: T
}

class ApiResponse<T> implements IApiResponse<T> {
    status: string;
    code: number;
    message: string;
    data?: T;

    constructor({
        status = "",
        code = 200,
        message = "",
        data
    } : Partial<IApiResponse<T>>) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    get isMFARequired(): boolean {
        return this.code === 423 || this.data === 'S423'
    }

    get isOk(): boolean {
        return this.code === 200;
    }

    get isCreated(): boolean {
        return this.code === 201;
    }

    get isSuccess(): boolean {
        return this.code >= 200 && this.code <= 299;
    }

    get isExpiredSession(): boolean {
        return this.data !== undefined && this.data === "S10";
    }

    get isIncorrectToken(): boolean {
        return this.data !== undefined && this.data === "S20";
    }

    get isAccessDenied(): boolean {
        return this.data !== undefined && this.data === "S50";
    }

    get isUserNotFound(): boolean {
        return this.data !== undefined && this.data === "S40";
    }

    get isEmailNotVerified(): boolean {
        return this.data !== undefined && this.data === "S80";
    }

    get isProfileNotSet(): boolean {
        return this.data !== undefined && this.data === "S90";
    }

    get isCategoryNotSet(): boolean {
        return this.data !== undefined && this.data === "S96";
    }

    get isAccountDisabled(): boolean {
        return this.data !== undefined && this.data === "S12";
    }

    get isAccountLocked(): boolean {
        return this.data !== undefined && this.data === "S11";
    }

    static fromJson(json: any): ApiResponse<any> {
        return new ApiResponse({
            status: json.status,
            code: json.code,
            message: json.message,
            data: json.data
        });
    }

    toJson(): any {
        return {
            status: this.status,
            code: this.code,
            message: this.message,
            data: this.data
        };
    }
}

export default ApiResponse;