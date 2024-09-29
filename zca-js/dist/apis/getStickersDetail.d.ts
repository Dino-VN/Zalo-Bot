export interface StickerDetailResponse {
    id: number;
    cateId: number;
    type: number;
    stickerUrl: string;
    stickerSpriteUrl: string;
    stickerWebpUrl: string | null;
}
export declare function getStickersDetailFactory(serviceURL: string): (stickerIds: number | number[]) => Promise<StickerDetailResponse[]>;
