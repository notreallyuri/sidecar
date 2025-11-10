import { createBrowserRouter, type RouteObject } from "react-router";
import Home from "@/pages/home";
import Plugins from "@/pages/plugins";
import { LayoutBase } from "./layouts/layout-base";

const routes: RouteObject[] = [
	{
		Component: LayoutBase,
		children: [
			{ index: true, Component: Home },
			{ path: "/plugins", Component: Plugins },
		],
	},
];

export const router = createBrowserRouter(routes);
