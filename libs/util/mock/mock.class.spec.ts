import { MEnviroment } from './environment.class';

interface AppConfig {
  production: boolean;
  api: {
    endpoint: string;
    port: number;
  };
  headerColor: string;
}

const TEST_APP2_CONFIG: AppConfig = {
  production: true,
  api: {
    endpoint: 'https://pro.mercadona.com',
    port: 9999,
  },
  headerColor: 'red',
};
const TEST_APP3_CONFIG: AppConfig = {
  production: true,
  api: {
    endpoint: 'https://pro.mercadona.com',
    port: 9999,
  },
  headerColor: 'red',
};
(window as { [key: string]: any }).testApp2_environment = TEST_APP2_CONFIG;
(window as { [key: string]: any }).testApp3_environment = TEST_APP3_CONFIG;

describe('MEnviroment', () => {
  const LOCAL_CONFIG: AppConfig = {
    production: false,
    api: {
      endpoint: 'https://local.mercadona.com',
      port: 8080,
    },
    headerColor: 'green',
  };

  it('Get local variables when window not defined', () => {
    const mEnvironment = new MEnviroment('testApp1', LOCAL_CONFIG);
    const environment = mEnvironment.environment;
    expect(mEnvironment.windowConfigPath).toBe('testApp1_environment');
    expect(environment).toBe(LOCAL_CONFIG);
  });

  it('Get local variables when window is defined (app2)', () => {
    const mEnvironment = new MEnviroment('testApp2', LOCAL_CONFIG);
    const environment = mEnvironment.environment;
    expect(mEnvironment.windowConfigPath).toBe('testApp2_environment');
    expect(environment).toBe(TEST_APP2_CONFIG);
  });

  it('Get local variables when window is defined (app3)', () => {
    const mEnvironment = new MEnviroment('testApp3', LOCAL_CONFIG);
    const environment = mEnvironment.environment;
    expect(mEnvironment.windowConfigPath).toBe('testApp3_environment');
    expect(environment).toBe(TEST_APP3_CONFIG);
  });
});
