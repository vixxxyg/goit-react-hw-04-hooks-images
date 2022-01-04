import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

const Load = () => {
  return (
    <Loader
      className={s.Loader}
      type="MutatingDots"
      color="darkturquoise"
      height={100}
      width={100}
      timeout={3000}
      radius={20}
      secondaryColor="lightseagreen"
    />
  );
};

export default Load;
