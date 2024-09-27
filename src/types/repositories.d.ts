declare namespace ProjectRepository {
  interface CreateParameters {
    id?: string;
    group: string;
    name: string;
    description: string;
    url: string;
    version?: string;
    healthcheck?: {
      type: 'GET' | 'POST';
      url: string;
      interval: number;
    };
  }

  interface UpdateParameters {
    group?: string;
    name?: string;
    description?: string;
    version?: string;
    release?: {
      tag: string;
      title: string;
      description: string;
      date: string;
    };
    commit?: {
      hash: string;
      author: string;
      message: string;
      branch: string;
    };
    history?: {
      healthchecks?: {
        checkedAt: string,
        status: 'SUCCESS' | 'ERROR' | string,
      }[];
    };
    issues?: {
      id: string;
      name: string;
      description: string;
      status: 'OPEN' | 'RESOLVED' | 'CLOSED' | string;
    }[],
  }

  interface FindParameters {
    ids?: ID[];
    group?: string;
    name?: string;
    first: number;
    after: number;
  }

  interface CountParameters {
    ids?: ID[];
    group?: string;
    name?: string;
  }
}

interface ProjectRepository {
  create(params: ProjectRepository.CreateParameters): Promise<Project>;

  get(id: ID): Promise<Project | undefined>;

  find(params: ProjectRepository.FindParameters): Promise<Project[]>;

  count(params: ProjectRepository.CountParameters): Promise<number>;

  update(params: ProjectRepository.UpdateParameters, where: { id: ID }): Promise<Project | undefined>;

  delete(id: ID): Promise<Project | undefined>;
}

interface IssueRepository {
  get(projectId: ID, issueId: ID): Promise<Issue | undefined>;

  create(projectId: ID, params: { name: string, description: string }): Promise<Issue>;

  update(params: ProjectRepository.UpdateParameters, where: { projectId: ID, issueId: ID }): Promise<Issue | undefined>;

  delete(projectId: ID, issueId: ID): Promise<Issue | undefined>;
}
