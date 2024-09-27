import { v4 as uuidv4 } from 'uuid';
import logger from '../../logger';

class ArrayRepository implements IssueRepository {
  constructor(
    protected projectRepository: ProjectRepository,
  ) {}

  public async get(projectId: ID, issueId: ID): Promise<Issue | undefined> {
    logger.debug(`${this.constructor.name}.get`, { projectId, issueId });

    const project = await this.projectRepository.get(projectId);

    const issue = project.issues.find(issue => issue.id === issueId);

    return issue;
  }

  public async create(projectId: ID, params: { name: string, description: string }): Promise<Issue> {
    logger.debug(`${this.constructor.name}.create`, { projectId, params });

    const project = await this.projectRepository.get(projectId);

    if ('issues' in project === false) project.issues = [];

    const issue = {
      id: uuidv4(),
      status: 'OPEN',
      ...params,
    };

    project.issues.unshift(issue);

    if (project.issues.length > 5) project.issues.pop();
    
    await this.projectRepository.update(project, { id: projectId });

    return issue;
  }

  public async update(params: ProjectRepository.UpdateParameters, where: { projectId: ID, issueId: ID }): Promise<Issue | undefined> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const project = await this.projectRepository.get(where.projectId);

    const index = project.issues.findIndex(issue => issue.id === where.issueId);

    const issue = {
      ...project.issues[index],
      ...params,
    };

    project.issues[index] = issue;

    await this.projectRepository.update(project, { id: where.projectId });

    return issue;
  }

  public async delete(projectId: ID, issueId: ID): Promise<Issue | undefined> {
    logger.debug(`${this.constructor.name}.delete`, { projectId, issueId });

    throw new Error('Method not implemented!');
  }
}

export default ArrayRepository;
