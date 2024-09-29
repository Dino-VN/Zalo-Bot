export type FindUserResponse = {
    avatar: string;
    cover: string;
    status: string;
    gender: number;
    dob: number;
    sdob: string;
    globalId: string;
    uid: string;
    zalo_name: string;
    display_name: string;
};
export declare function findUserFactory(serviceURL: string): (phoneNumber: string) => Promise<FindUserResponse | null>;
