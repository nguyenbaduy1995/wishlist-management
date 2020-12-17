const vars = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.jwtSecret || 'wishlist'
};

const configs = {
  test: {
    ...vars
  },
  development: {
    ...vars
  },
  production: {
    ...vars
  },
};

export default configs[process.env.NODE_ENV];
