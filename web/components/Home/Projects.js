import PropTypes from 'prop-types';
import Image from 'next/image';

function Projects({ projects }) {
  return (
    <div className="projects-list flex flex-wrap">
      {projects.map((project) => {
        return (
          <div
            className="lg:w-1/3 sm:w-1/2 w-full inline-block p-4"
            key={project.id}
          >
            <div className="pt-6 px-6 pb-5 shadow-2xl rounded-3xl h-full flex flex-col justify-between">
              <div className="">
                <h3 className="font-bold mt-1">{project.title}</h3>
                <p className="text-gray-500 my-4 text-sm">
                  {project.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <a
                  href={project.link || `/examples/${project.id}`}
                  className="bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded-full flex justify-center items-center text-white w-full mr-2 text-sm"
                >
                  <Image src="/link.svg" width="15" height="15" alt="project link icon"/>
                  <span className="ml-2">Open dApp</span>
                </a>
                <a
                  href={project.sourceUrl}
                  className="bg-gray-100 hover:bg-gray-200 px-2 py-2 rounded-full flex justify-center items-center w-full text-sm"
                >
                  <Image src="/git-icon.svg" width="15" height="18" alt="project git icon"/>
                  <span className="ml-2">Source Code</span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string,
      sourceUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Projects;
