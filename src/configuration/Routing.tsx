import { CategoryRoute } from "../app/category/page";
import { PageNotFoundRoute } from "../app/error/page";
import { GroupRoute } from "../app/group/page";
import { HelpRoute } from "../app/help/page";
import { HomeRoute } from "../app/page";
import { SectionRoute } from "../app/section/page";
import { RouteInterface, RouteParams } from "./Route";

class Routing {
    static instance = new Routing();

    /** Home Route */
    home: RouteInterface = HomeRoute;

    /** Home - Category Route */
    category: RouteInterface = CategoryRoute;

    /** Home - Category - Section Route */
    section: RouteInterface = SectionRoute;

    /** Home - Category - Section - Group Route */
    group: RouteInterface = GroupRoute;

    /** Home - Category - Section - Group - Help Route */
    help: RouteInterface = HelpRoute;

    /** ERROR 404 Route */
    error: RouteInterface = PageNotFoundRoute;

    /** Automatically collect all routes */
    getAllRoutes(): RouteInterface[] {
        return Object.values(this).filter((route) => this.isRouteInterface(route));
    }

    /** Helper to check if a value implements RouteInterface */
    private isRouteInterface(route: any): route is RouteInterface {
        return (
            route &&
            typeof route.path === 'string' &&
            typeof route.page !== 'undefined' &&
            (route.children === undefined || Array.isArray(route.children))
        );
    }

    static getRoute(route: RouteInterface, params: RouteParams = {}): string {
        if(params.link) {
            return `${route.path}/${params.link}`;
        } else {
            return route.pathView ? route.pathView(params) : route.path;
        }
    }
}

export default Routing;