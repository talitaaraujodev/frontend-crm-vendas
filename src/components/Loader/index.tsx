import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-container">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#2d5bff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
