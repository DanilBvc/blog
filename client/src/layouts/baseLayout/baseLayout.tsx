import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import './baseLayout.scss';
import Header from '../../components/general/header/header';
import NavigationSideBar from '../../components/sideBars/navigationSideBar/navigationSideBar';
import ContactsSideBar from '../../components/sideBars/contactsSideBar/contactsSideBar';

const BaseLayout: FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <div className="base-layout">
        <div className="base-layout-nav-sideBar">
          <NavigationSideBar />
        </div>
        <div className="base-layout-content">
          <div className="base-layout-container">{children ?? <></>}</div>
        </div>
        <div className="base-layout-contacts">
          <ContactsSideBar />
        </div>
      </div>
    </>
  );
};

export default BaseLayout;
