import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
  const hasToken = localStorage.getItem('user'); 

  return hasToken ? (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  ) : (
    <section className={classes.starting}>
      <h1>Please Login or Sign Up!</h1>
    </section>
  );
};

export default StartingPageContent;
