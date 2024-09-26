interface ItemInfoPhotobook {
    _name?: string;
    id: number;
    _hideKeys: string[];
}

interface Photobook {
    id: number;
    created: number;
    creator: number;
    photos?: any;
}