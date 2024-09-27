import APIError from '../../errors/APIError';

class Issues implements ProjectIssuesController {
  constructor(
    protected issueRepository: IssueRepository,
  ) {}

  public async get(projectId: ID, issueId: ID): Promise<ProjectIssuesController.GetIssueResponse> {
    const issue = await this.issueRepository.get(projectId, issueId);

    if (typeof issue === 'undefined') {
      throw new APIError({ message: 'Issue not found!', code: 404 });
    }

    return { issue };
  }

  public async addIssue(projectId: ID, params: { name: string, description: string }): Promise<ProjectIssuesController.AddIssueResponse> {
    const issue = await this.issueRepository.create(projectId, params);

    return { issue };
  }

  public async updateIssue(projectId: ID, issueId: ID, params: { name?: string, description?: string, status?: 'OPEN' | 'RESOLVED' | 'CLOSED' | string }): Promise<ProjectIssuesController.UpdateIssueResponse> {
    const issue = await this.issueRepository.update(params, { projectId, issueId });

    return { issue };
  }
}

export default Issues;
