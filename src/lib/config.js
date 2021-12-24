const config = {
	baseURL: import.meta.env.VITE_PUBLIC_BASE_URL,
	deployMode: import.meta.env.VITE_DEPLOY_MODE,
	requestTimeout: 15000 //milliseconds
};

export { config as default };
