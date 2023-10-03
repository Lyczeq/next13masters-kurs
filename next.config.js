/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	rewrites: async () => [
		{
			destination: "/categories/:categoryName/1",
			source: "/categories/:categoryName",
		},
	],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "media.graphassets.com",
			},
		],
	},
};

module.exports = nextConfig;
