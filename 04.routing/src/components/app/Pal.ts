namespace vgl.retros {
    export interface IPal{
        location: () => Location;
        setLocation: (url: string) => void;
        setInterval(handler: (...args: any[]) => void, timeoutInMilliseconds: number): number;
        clearInterval(handle: number): void;
        setTimeout(handler: (...args: any[]) => void, timeoutInMilliseconds: number): number;
    }

    export class Pal implements IPal {
        location = () => {
            return document.location;
        }

        setLocation = (url: string) => {
            document.location.replace(url);
        }

        setInterval(handler: (...args: any[]) => void, timeoutInMilliseconds: number): number {
            return window.setInterval(handler, timeoutInMilliseconds);
        }

        clearInterval(handle: number): void {
            window.clearInterval(handle);
        }

        setTimeout(handler: (...args: any[]) => void, timeoutInMilliseconds: number): number {
            return window.setTimeout(handler, timeoutInMilliseconds);
        }
    }
}