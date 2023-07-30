import DropDownMenu from '../../general/dropDownMenu/dropDownMenu';
import { navData } from './navigation/navigation.options';
import NavigationInvitations from './navigationInvitations/navigationInvitations';
import NavigationUserData from './navigationUserData/navigationUserData';

const NavigationSideBar = () => {
  return (
    <>
      <NavigationUserData />
      <DropDownMenu menuData={navData} />
      <NavigationInvitations />
    </>
  );
};
export default NavigationSideBar;
