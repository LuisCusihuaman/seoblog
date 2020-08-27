import Header from './Header';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <p>footer</p>
    </>
  );
};

export default Layout;
