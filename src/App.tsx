import { Contently } from "@serchservice/contently";
import * as Uikit from "@serchservice/web-ui-kit";
import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CategoryParent from "./app/category/parent";
import DataProvider from "./backend/database/DataProvider";
import Keys from "./backend/Keys";
import Routing from "./configuration/Routing";
import Layout from "./layout/Layout";

export const contently = new Contently({
    space: Keys.CONTENTFUL_SPACE,
    token: Keys.CONTENTFUL_TOKEN,
    withLog: true
})

const ParentPage = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default function Main() {
    return (
        <Uikit.WebUiKit>
            <DataProvider>
                <Router>
                    <Uikit.Scroller>
                        <Routes>
                            <Route path={Routing.instance.home.path} element={<ParentPage />}>
                                <Route index element={Routing.instance.home.page} />
                                <Route path={Routing.instance.category.path} element={<CategoryParent />}>
                                    <Route index element={Routing.instance.category.page} />
                                    <Route path={Routing.instance.section.path} element={Routing.instance.section.page} />
                                    <Route path={Routing.instance.group.path} element={Routing.instance.group.page} />
                                    <Route path={Routing.instance.help.path} element={Routing.instance.help.page} />
                                </Route>
                            </Route>
                            <Route path={Routing.instance.error.path} element={Routing.instance.error.page} />
                        </Routes>
                    </Uikit.Scroller>
                </Router>
            </DataProvider>
        </Uikit.WebUiKit>
    );
}