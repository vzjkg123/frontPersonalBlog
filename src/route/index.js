import {createRouter, createWebHistory} from 'vue-router'
import About from "@/pages/About";
import Home from "@/pages/home";
import Interview from "@/pages/Interview";
import Diary from "@/pages/Diary";
import FriendLinks from "@/pages/FriendLinks";
import EssayPreview from "@/pages/EssayPreview";
import Personal from "@/pages/Personal";
import MdPoster from "@/pages/MdPoster";
import Manage from "@/pages/Manage";

const routes = [
    {path: '/', component: Home},
    {path: '/interview', component: Interview},
    {path: '/friendLinks', component: FriendLinks},
    {path: '/diary', component: Diary},
    {path: '/about', component: About},
    {path: '/essayPreview', component: EssayPreview},
    {path: '/personal', component: Personal},
    {path: '/mdPoster', component: MdPoster},
    {path: '/manage',component: Manage}

]
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})