module.exports = {
  apps: [
    {
      name: 'prettycache-dev',
      cwd: __dirname,
      script: 'npm',
      args: 'run dev:local',
      env: {
        NODE_ENV: 'development',
        LOCAL_DEV: 'true',
      },
    },
  ],
}
