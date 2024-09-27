import { v4 as uuidv4 } from 'uuid';
import logger from '../../logger';

class ArrayRepository implements ProjectRepository {
  constructor(
    protected array: Project[] = [],
  ) {}

  public async get(id: ID): Promise<Project | undefined> {
    logger.debug(`${this.constructor.name}.get`, { id });

    const item = this.array.find(project => project.id === id);

    return item;
  }

  public async create(params: ProjectRepository.CreateParameters): Promise<Project> {
    logger.debug(`${this.constructor.name}.create`, params);

    const item = {
      id: uuidv4(),
      version: 'unknown',
      issues: [],
      ...params,
    }
    
    this.array.push(item);

    return item;
  }

  public async find(params: ProjectRepository.FindParameters): Promise<Project[]> {
    logger.debug(`${this.constructor.name}.find`, { params });

    const items = this.array.filter(project => {
      if ('group' in params && project.group !== params.group) return false;
      if ('name' in params && project.name.toLocaleLowerCase().startsWith(params.name.toLocaleLowerCase()) === false) return false;

      return true;
    });

    return items.splice(params.after, params.first);
  }

  public async update(params: ProjectRepository.UpdateParameters, where: { id: ID }): Promise<Project | undefined> {
    logger.debug(`${this.constructor.name}.update`, { params, where });

    const index = this.array.findIndex(project => project.id === where.id);

    const item = { ...this.array[index], ...params };

    this.array[index] = item;

    return item;
  }

  public async count(params: ProjectRepository.CountParameters): Promise<number> {
    logger.debug(`${this.constructor.name}.update`, { params });

    return 0;
  }

  public async delete(id: ID): Promise<Project | undefined> {
    logger.debug(`${this.constructor.name}.delete`, { id });

    throw new Error('Method not implemented!');
  }
}

export default ArrayRepository;
