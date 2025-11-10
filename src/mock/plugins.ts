import type { AppPlugin } from "@/types/plugins";

export const mockPlugins: AppPlugin[] = [
	{
		info: {
			name: "Image Optimizer",
			version: "1.2.3",
			author: "Jane Smith",
			description:
				"Automatically optimizes and compresses images during the build process to improve performance and reduce file sizes.",
		},
		binary: "/usr/local/bin/image-optimizer",
		fields: [
			{
				label: "Quality",
				flag: "--quality",
				type: "select",
				options: ["low", "medium", "high", "lossless"],
			},
			{
				label: "Output Directory",
				flag: "--output",
				type: "text",
			},
			{
				label: "Enable WebP",
				flag: "--webp",
				type: "checkbox",
			},
		],
	},
	{
		info: {
			name: "Database Migrator",
			version: "2.0.1",
			author: "John Doe",
			description: "Handles database migrations and schema versioning.",
		},
		binary: "/usr/local/bin/db-migrate",
		fields: [
			{
				label: "Database URL",
				flag: "--db-url",
				type: "text",
			},
			{
				label: "Migration Files",
				flag: "--files",
				type: "file",
			},
		],
	},
];
