import style from "../src/styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto bg-slate-50 w-3/5 h-3/4 grid lg:grid-cols-2 rounded-md">
        <div className={style.imgStyle}>
          <div className={style.cartoonImg}></div>
          <div className={style.cloudOne}></div>
          <div className={style.cloud_two}></div>
        </div>
        <div className="right flex flex-col justify-evenly">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
