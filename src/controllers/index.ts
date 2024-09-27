import Projects from './Projects';
import projects from './projects/index';
import Issues from './projects/Issues';
import repositories from '../repositories';

const container = {
  get Projects() {
    return new Projects(repositories.Project);
  },

  get projects() {
    return projects;
  },

  get Issues() {
    return new Issues(repositories.Project);
  },
};

export default container;
