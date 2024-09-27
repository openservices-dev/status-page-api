import APIError from '../errors/APIError';
import anonymize from '../utils/anonymize';

class Projects implements ProjectsController {
  constructor(
    protected projectRepository: ProjectRepository,
  ) {}

  public async get(id: ID): Promise<ProjectsController.GetProjectResponse> {  
    const project = await this.projectRepository.get(id);

    if (typeof project === 'undefined') {
      throw new APIError({ message: 'File not found!', code: 404 });
    }

    return {
      project,
    };
  }

  public async list(params: { first: number, after: number }): Promise<ProjectsController.ListProjectsResponse> {  
    const projects = await this.projectRepository.find(params);

    return {
      projects,
    };
  }

  public async update(id: ID, params: any): Promise<ProjectsController.UpdateProjectResponse> {
    const project = await this.projectRepository.update(params, { id });

    return {
      project,
    };
  }
}

export default Projects;
