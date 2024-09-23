import Device from '../models/Device';
import { deviceDetect } from 'react-device-detect';

class AsyncOperation {
    static async getDevice(): Promise<Device> {
        const platform = navigator.platform;
        const userAgent = navigator.userAgent;
        const appVersion = navigator.appVersion;
        const vendor = navigator.vendor;
        const language = navigator.language;

        // Get IP Address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        let deviceInfo: any = {
            platform,
            userAgent,
            appVersion,
            vendor,
            language,
            ipAddress,
        };

        // Additional device-specific details
        if (/android/i.test(userAgent)) {
            deviceInfo = {
                ...deviceInfo,
                device: 'Android',
                name: /android/i.exec(userAgent)?.[0] || '',
            };
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            deviceInfo = {
                ...deviceInfo,
                device: 'iOS',
                name: /iPhone|iPad|iPod/.exec(userAgent)?.[0] || '',
            };
        } else if (/Macintosh/.test(userAgent)) {
            deviceInfo = {
                ...deviceInfo,
                device: 'MacOS',
                name: 'Macintosh',
            };
        } else if (/Windows/.test(userAgent)) {
            deviceInfo = {
                ...deviceInfo,
                device: 'Windows',
                name: 'Windows PC',
            };
        } else if (/Linux/.test(userAgent)) {
            deviceInfo = {
                ...deviceInfo,
                device: 'Linux',
                name: 'Linux PC',
            };
        } else if (/CrOS/.test(userAgent)) {
            deviceInfo = {
                ...deviceInfo,
                device: 'Chrome OS',
                name: 'Chromebook',
            };
        } else {
            deviceInfo = {
                ...deviceInfo,
                device: 'Unknown',
                name: 'Unknown',
            };
        }

        const detectedDevice = deviceDetect(userAgent);

        return new Device({
            device: deviceInfo.appVersion,
            name: detectedDevice.model,
            host: deviceInfo.userAgent,
            platform: deviceInfo.platform,
            operatingSystem: detectedDevice.os,
            operatingSystemVersion: detectedDevice.osVersion,
            localHost: `${detectedDevice.vendor} | ${deviceInfo.vendor}`,
            ipAddress: deviceInfo.ipAddress,
        });
    };
}

export default AsyncOperation;