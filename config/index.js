const dotenv = require("dotenv");
const colors = require("colors");

colors.setTheme({
	info: ["cyan", "bold"],
	warn: ["yellow", "bold"],
	success: ["green", "bold"],
	error: ["red", "bold"],
	test: ["blue"],
});

let env_file = "";
switch (process.env.NODE_ENV) {
	case "staging":
		env_file = "staging.env";
		process.env.is_staging_env = true;
		break;
	case "production":
		env_file = "production.env";
		process.env.is_production_env = true;
		break;
	default:
		env_file = ".env";
		process.env.is_development_env = true;
		break;
}

// Load the env based on the environment
const loadEnv = dotenv.config({ path: env_file }).error;
if (loadEnv) {
	console.log("Invalid env provided exiting the app.".error, loadEnv);
	process.exit(1);
}