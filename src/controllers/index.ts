import Projects from './Projects';
import projects from './projects/index';
import repositories from '../repositories';

const container = {
  get Projects() {
    return new Projects(repositories.Project);
  },

  get projects() {
    return projects;
  },
};

export default container;
