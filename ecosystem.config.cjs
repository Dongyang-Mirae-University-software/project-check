module.exports = {
  apps: [
    {
      name: "project-check",
      script: "src/monitor.js",
      cwd: __dirname,
      interpreter: "node",
      args: "",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
