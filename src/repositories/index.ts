import project from './project';
import issue from './issue';

const container = {
  get Project(): ProjectRepository {
    return project.Array;
  },

  get Issue(): IssueRepository {
    return issue.Array;
  },
};

export default container;
