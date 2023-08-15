export const getImageSrc = (src: string) => {
  return src[0] === "/" ? `/images${src}` : src;
};
