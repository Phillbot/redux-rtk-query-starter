export type HttpBinResponse = Readonly<{
  args?: Record<string, string>;
  headers?: Record<string, string>;
  origin?: string;
  url: string;
}>;

export type HealthCheck = Readonly<{
  status: 'ok';
  latency: number;
  checkedAt: string;
  echo: HttpBinResponse;
}>;

export type PingHealthArgs = Readonly<{
  params?: Record<string, string>;
}>;
