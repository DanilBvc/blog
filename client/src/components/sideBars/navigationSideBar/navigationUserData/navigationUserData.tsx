import { useAppSelector } from '../../../../store/hooks/redux';
import BlockWrapper from '../../../general/blockWrapper/blockWrapper';
import ExpandableText from '../../../general/expandableText/expandableText';
import UserAvatar from '../../../general/userAvatar/userAvatar';

const NavigationUserData = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  return (
    <BlockWrapper>
      <div className="navigation-user-data">
        <UserAvatar />
        <div className="navigation-user-info">
          <h3>{userData?.fullName}</h3>
          {userData ? <ExpandableText text={userData?._id} length={5} /> : ''}
        </div>
      </div>
    </BlockWrapper>
  );
};
export default NavigationUserData;
