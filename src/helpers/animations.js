const fadeInAnimation = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.5,
    },
  },
};

const buttonAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.5,
      ease: "easeInOut",
    },
  },
};

const imageAnimation = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const exitAnimationHero = {
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { duration: 0.7 },
  },
};

const formPageLoadingAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", duration: 0.2 },
  },
  exit: {
    opacity: 0,
  },
};

const formModalAnimation = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.5 },
  },
};

const modalAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const fadeInMobileAnimation = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  exit: {
    x: "-100%",
    opacity: 0,
  },
};

export {
  fadeInAnimation,
  buttonAnimation,
  imageAnimation,
  exitAnimationHero,
  formPageLoadingAnimation,
  formModalAnimation,
  modalAnimation,
  fadeInMobileAnimation,
};
