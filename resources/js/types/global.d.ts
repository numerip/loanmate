// No imports here, just global declarations

interface Window {
  Wayfinder: {
    [controller: string]: {
      [method: string]: () => {
        url: string;
        method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head';
      };
    };
  };
}
