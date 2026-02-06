import { styles } from '../style';

const SectionWrapper = (Component, idName) =>
  function Hoc() {
    return (
      <section
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        {/* Anchor for navigation */}
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </section>
    );
  };

export default SectionWrapper;