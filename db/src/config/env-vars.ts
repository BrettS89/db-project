const required = {
  PORT: true,
};

export const env = {
  PORT: 4001,
  MANAGER_URL: 'http://lynx-manager:4000',
};

export const validateEnv = () => {
  Object.entries(env).forEach(([k, v]) => {
    //@ts-ignore
    if (required[k] && v === undefined) {
      throw new Error(`Missing environment variable: ${k}`);
    }
  });
};
