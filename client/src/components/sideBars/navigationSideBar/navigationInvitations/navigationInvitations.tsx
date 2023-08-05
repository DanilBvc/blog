import { emptyCircle } from '../../../../assets/global';
import './navigationInvitations.scss';
const NavigationInvitations = () => {
  return (
    <>
      <div className="invitations-title">
        INVITATIONS
        {emptyCircle(1, 'rgb(189, 0, 0)')}
      </div>
      <div className="invitations-content"></div>
    </>
  );
};
export default NavigationInvitations;
