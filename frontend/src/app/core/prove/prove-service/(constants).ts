import { Flowtype } from './(definitions)';

function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export const DEFAULT_REQUEST_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// Generic mock response function for testing purposes
export const mockResponse = async <T>(mockData: T): Promise<T> => {
  await sleep(3);
  return {
    data: mockData,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  } as T;
};

export const mapIsMobileToFlowtype = (isMobile: boolean): Flowtype => {
  return isMobile ? Flowtype.MOBILE : Flowtype.DESKTOP;
};
