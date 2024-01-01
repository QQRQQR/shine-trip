export const getAssetUrl = (image) => {
  // image: 相对路径
  // import.meta.url: 当前文件的路径
  return new URL(`../assets/img/${image}`, import.meta.url)
}