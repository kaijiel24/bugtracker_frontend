const contextPath = import.meta.env.BASE_URL;

export default class ProjectsService {
    async getProjects() {
        return fetch(contextPath + 'demo/data/projects.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    async getProject(id) {
        return fetch(contextPath + 'demo/data/project' + id + '.json')
            .then((res) => res.json())
    }
}
