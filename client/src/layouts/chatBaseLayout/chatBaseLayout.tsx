import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './chatBaseLayout.scss';
import Header from '../../components/general/header/header';
import NavigationSideBar from '../../components/sideBars/navigationSideBar/navigationSideBar';
import ContactsSideBar from '../../components/sideBars/contactsSideBar/contactsSideBar';

const ChatBaseLayout: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="chat-base-layout">
        <div className="base-layout-nav-sideBar">
          <NavigationSideBar />
        </div>
        <div className="base-layout-content">
          <div className="base-layout-container">{children ?? <></>}</div>
        </div>
      </div>
    </>
  );
};

export default ChatBaseLayout;
