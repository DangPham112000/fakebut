import { defineConfig } from "vite";

export default defineConfig(async ({ command, mode }) => {
	return {
		root: "./",
		test: {
			globals: true,
			environment: "node",
			include: ["./tests/**/*.test.js"],
			exclude: [],
			coverage: {
				provider: "istanbul",
				reporter: ["text", "html"],
				reportsDirectory: ".tmp/coverage",
				reportOnFailure: true,
				enabled: true,
				include: ["src/**/*.js"],
				exclude: [],
			},
			setupFiles: "build/vite/vitest.setup.js",
			fakeTimers: {
				toFake: [
					"setTimeout",
					"clearTimeout",
					"setInterval",
					"clearInterval",
					"setImmediate",
					"clearImmediate",
					"Date",
					"performance",
				],
			},
		},
	};
});
