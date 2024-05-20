import slyles from "./NotFound.module.scss";
const NotFound = () => {
  return (
    <div className={slyles.container}>
      <div className={slyles.entrance}>
        <div className={slyles.entranceBlock}>
          <p>NotFound page</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
