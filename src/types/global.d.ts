export { };

declare global {
    interface Window {
        gtag?: (command: string, targetId: string, config?: any) => void;
        fbq?: (command: string, eventName: string, parameters?: any) => void;
        lintrk?: (command: string, parameters?: any) => void;
    }
}
