const vars = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'wishlist'
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
