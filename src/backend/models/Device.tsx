export interface IDevice {
    device: string;
    name: string;
    host: string;
    platform: string;
    operatingSystem: string;
    operatingSystemVersion: string;
    localHost: string;
    ipAddress: string;
}

class Device implements IDevice {
    device: string;
    name: string;
    host: string;
    platform: string;
    operatingSystem: string;
    operatingSystemVersion: string;
    localHost: string;
    ipAddress: string;

    constructor({
        device = '',
        name = '',
        host = '',
        platform = '',
        operatingSystem = '',
        operatingSystemVersion = '',
        localHost = '',
        ipAddress = ''
    }: Partial<IDevice> = {}) {
        this.device = device;
        this.name = name;
        this.host = host;
        this.platform = platform;
        this.operatingSystem = operatingSystem;
        this.operatingSystemVersion = operatingSystemVersion;
        this.localHost = localHost;
        this.ipAddress = ipAddress;
    }

    static fromJson(json: any): Device {
        return new Device({
            device: json.device || '',
            name: json.name || '',
            host: json.host || '',
            platform: json.platform || '',
            operatingSystem: json.operating_system || '',
            operatingSystemVersion: json.operating_system_version || '',
            localHost: json.local_host || '',
            ipAddress: json.ip_address || ''
        });
    }

    toJson(): any {
        return {
            device: this.device,
            name: this.name,
            host: this.host,
            platform: this.platform,
            operating_system: this.operatingSystem,
            operating_system_version: this.operatingSystemVersion,
            local_host: this.localHost,
            ip_address: this.ipAddress
        };
    }
}

export default Device;