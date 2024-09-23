export interface RouteParams {
    category?: string;
    section?: string;
    help?: string;
    group?: string;
    link?: string;
}

export interface RouteInterface {
    path: string;
    pathView?: (params: RouteParams) => string;
    page: JSX.Element;
    children?: RouteInterface[];
}