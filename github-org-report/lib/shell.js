const cp = require("child_process");

function run(command, args, options = {}) {
  const result = cp.spawnSync(command, args, {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 256,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0 && !options.allowFailure) {
    const stderr = (result.stderr || "").trim();
    const stdout = (result.stdout || "").trim();
    const message = stderr || stdout || `Command failed: ${command} ${args.join(" ")}`;
    const error = new Error(message);
    error.status = result.status;
    throw error;
  }

  return {
    ok: result.status === 0,
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || "",
  };
}

module.exports = { run };
