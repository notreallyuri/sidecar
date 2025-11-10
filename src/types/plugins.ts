type FieldType = "text" | "file" | "select" | "checkbox";

type AppPluginInfo = {
	name: string;
	version: string;
	author?: string;
	description?: string;
};

type AppPluginField = {
	label: string;
	description?: string;
	flag?: string;
	type: FieldType;
	options?: string[];
};

type AppPlugin = {
	info: AppPluginInfo;
	binary: string;
	fields: AppPluginField[];
};

type AppPluginManifestItem = {
	name: string;
	path: string;
};

type AppPluginManifest = {
	plugins: AppPluginManifestItem[];
};

type AppPluginVerifyResponse = {
	validPlugins: string[];
	errors: string[];
	orphanedPlugins: string[];
};

export type {
	AppPluginInfo,
	AppPluginField,
	AppPlugin,
	AppPluginManifestItem,
	AppPluginManifest,
	FieldType,
	AppPluginVerifyResponse,
};
