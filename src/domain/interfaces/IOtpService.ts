
export interface IOtpService {
    send(phone: string, opt: string): Promise<void>;
    verify(phone: string, opt: string): Promise<boolean>;

}
