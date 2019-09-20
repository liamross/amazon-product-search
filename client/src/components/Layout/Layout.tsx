import React, {FC} from 'react';

interface LayoutProps {
  isItem?: boolean;
}

const Layout: FC<LayoutProps> = ({children, isItem}) => {
  return (
    <div className="Layout">
      {isItem ? <div className="Layout__item">{children}</div> : <div className="Layout__list">{children}</div>}
    </div>
  );
};

export default Layout;
