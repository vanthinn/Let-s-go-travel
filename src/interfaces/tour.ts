export interface ITour {
    id: number,
    name: string,
    special: string,
    area: string,
    address: string,
    info: string,
    time_visit: number,
    url_imgs: string
}

export interface IHistory {
    id: number
    last_view: string
    time: number
    tourist_id: number;
    user_id: number
    tourist: ITour
}