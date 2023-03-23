import { constants as HTTP_CODES } from "http2";

export const getTest = () => {
    const record: any = [];
    return { code: HTTP_CODES.HTTP_STATUS_OK, record }
}