type ID = string;

type Release = {
  tag: string;
  title: string;
  description: string;
  date: string;
}

type Commit = {
  hash: string;
  author: string;
  message: string;
  branch: string;
}

type Issue = {
  id: ID;
  name: string;
  description: string;
  status: 'OPEN' | 'RESOLVED' | 'CLOSED' | string;
}

type Project = {
  id: ID;
  group: string;
  name: string;
  description: string;
  url: string;
  version: string;
  release?: Release;
  commit?: Commit;
  healthcheck?: {
    type: 'GET' | 'POST' | string;
    url: string;
    interval: number;
  };
  history?: {
    healthchecks?: {
      checkedAt: string,
      status: 'SUCCESS' | 'ERROR' | string,
    }[];
  };
  issues?: Issue[];
}
