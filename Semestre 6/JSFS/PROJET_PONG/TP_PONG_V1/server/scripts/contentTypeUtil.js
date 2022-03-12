/**
  return a content-type deduced from <path> final extension
  @param path the path where to look for final extension
*/
export const getContentTypeFrom = path => {
  const lastPointPosition = path.lastIndexOf('.');
  const extension = path.substring(lastPointPosition);
  return  contentTypes.get(extension) || '';
}

// the map that associates extenstion to content-type
const contentTypes = new Map().set('.css', 'text/css')
                              .set('.html', 'text/html')
                              .set('.jpg',"image/jpeg")
                              .set('.jpeg',"image/jpeg")
                              .set('.txt',"plain/text")
                              .set('.png',"image/png")
                              .set('.js', 'application/javascript')
                              .set('.json', 'application/json');
