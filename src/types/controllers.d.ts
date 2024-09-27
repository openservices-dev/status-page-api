declare namespace ProjectsController {
  interface GetProjectResponse {
    project: Project;
  }

  interface ListProjectsResponse {
    projects: Project[];
  }

  interface UpdateProjectResponse {
    project: Project;
  }
}

interface ProjectsController {
  get(id: ID): Promise<ProjectsController.GetProjectResponse>;

  list(params: any): Promise<ProjectsController.ListProjectsResponse>;

  update(id: ID, params: any): Promise<ProjectsController.UpdateProjectResponse>;
}

declare namespace ProjectIssuesController {
  interface GetIssueResponse {
    issue: Issue;
  }

  interface AddIssueResponse {
    issue: Issue;
  }

  interface UpdateIssueResponse {
    issue: Issue;
  }
}

interface ProjectIssuesController {
  get(projectId: ID, issueId: ID): Promise<ProjectIssuesController.GetIssueResponse>;

  addIssue(projectId: ID, params: { name: string, description: string }): Promise<ProjectIssuesController.AddIssueResponse>;

  updateIssue(projectId: ID, issueId: ID, params: { name?: string, description?: string, status?: 'OPEN' | 'RESOLVED' | 'CLOSED' | string }): Promise<ProjectIssuesController.UpdateIssueResponse>;
}