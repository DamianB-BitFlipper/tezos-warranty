import Image from 'next/image';
import PropTypes from 'prop-types';

function Team({ members }) {
  return (
    <div className="team-members w-full">
      {members.map((member, index) => {
        return (
          <div
            className="lg:w-1/3 sm:w-1/2 w-full inline-block p-4"
            key={index}
          >
            <div className="pt-8 px-6 pb-3 shadow-2xl rounded-3xl text-center">
              <Image
                src={member.avatar}
                width="90"
                height="90"
                className="rounded-full shadow-md"
                alt={`${member.name} profile picture`}
              />
              <h3 className="font-bold mt-3 text-blue-500">{member.name}</h3>
              <h5 className="font-bold mt-3 text-gray-400 text-sm">
                {member.role}
              </h5>
              <div className="flex justify-center items-center my-5">
                <a
                  href={member.linkedin}
                  className="hover:bg-gray-100 px-2 py-2 rounded-lg flex justify-center items-center"
                >
                  <Image src="/linkedin.svg" width="20" height="20" alt="linkedin icon"/>
                </a>
                <a
                  href={member.facebook}
                  className="hover:bg-gray-100 px-2 py-2 rounded-lg flex justify-center items-center"
                >
                  <Image src="/facebook.svg" width="20" height="20" alt="facebook icon"/>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Team.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      facebook: PropTypes.string.isRequired,
    })
  ),
};
export default Team;
