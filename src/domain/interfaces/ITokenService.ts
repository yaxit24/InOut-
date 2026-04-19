
export interface ITokenService {
    sign(payload: Record<string, unknown>): string;
    verify(token: string): Record<string, unknown>;

}
