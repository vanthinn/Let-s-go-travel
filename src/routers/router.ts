import { ROUTER } from "../commom/constants";
import DefaultLayout from "../layouts/DefaultLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ChangePassword from "../pages/ChangePassword";
import DetailTourist from "../pages/DetailTourist";
import History from "../pages/History";
import Home from "../pages/Home";
import Profile from "../pages/Profile";


export const routerUser = [
    { path: ROUTER.HOME, element: Home, layout: DefaultLayout },
    { path: ROUTER.PROFILE, element: Profile, layout: ProfileLayout },
    { path: ROUTER.HISTORY, element: History, layout: ProfileLayout },
    { path: ROUTER.CHANGE_PASSWORD, element: ChangePassword, layout: ProfileLayout },
    { path: ROUTER.DETAIL, element: DetailTourist, layout: DefaultLayout },


];