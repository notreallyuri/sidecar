import { createBrowserRouter, type RouteObject } from "react-router";
import Home from "@/pages/home";
import Plugins from "@/pages/plugins";
import Settings from "@/pages/settings";
import { LayoutBase } from "./layouts/layout-base";

const routes: RouteObject[] = [
	{
		Component: LayoutBase,
		children: [
			{ index: true, Component: Home },
			{ path: "/plugins", Component: Plugins },
			{ path: "/settings", Component: Settings },
		],
	},
];

export const router = createBrowserRouter(routes);
