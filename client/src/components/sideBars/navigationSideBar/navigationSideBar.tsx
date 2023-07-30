import BlockWrapper from '../../general/blockWrapper/blockWrapper';
import Navigation from './navigation/navigation';
import NavigationInvitations from './navigationInvitations/navigationInvitations';
import NavigationUserData from './navigationUserData/navigationUserData';

const NavigationSideBar = () => {
  return (
    <>
      <NavigationUserData />
      <Navigation />
      <NavigationInvitations />
    </>
  );
};
export default NavigationSideBar;
