import PeopleComponent from '../../components/people/peopleComponent';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import './people.scss';
const People = () => {
  return (
    <BaseLayout>
      <div className="people-wrapper">
        <PeopleComponent />
      </div>
    </BaseLayout>
  );
};
export default People;
