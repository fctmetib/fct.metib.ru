module.exports = {
    apps: [{
      name: 'fct.metib.ru',
      script: 'node dist/metallinvestbank-web/server/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 1000,
      },
      autorestart: true,
      watch: false,
    }],
  };
  