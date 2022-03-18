import image from "./undraw_Diary_re_4jpc (2) (1).png";
import classes from "./StartingPageContent.module.css";
const StartingPageContent = () => {
  return (
    <section className={classes.centeredBox}>
      <div className={classes.box}>
        <div className={classes.text}>
          <h1>New day - new word! </h1>
          <p>Save all new words in one place ! </p>
        </div>
        <div>
          <img className={classes.img} src={image} alt="learning women" />
        </div>
      </div>
    </section>
  );
};

export default StartingPageContent;
