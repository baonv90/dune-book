import { useState, useEffect } from "react";

// function removeHtmlTags(html) {
//   return html.replace(/<\/?[^>]+(>|$)/g, "");
// }

// A hook to fetch data from given url
// it returns the fetching status loading and data
export const useFetchData = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isMobile = window.innerWidth < 480;

  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) => {
      res
        .text()
        .then((data) => {
          const startIndex = data.indexOf(
            isMobile
              ? "<div class='mobile_chapter_navigator'"
              : `<div id='chapter_navigator_box_top`
          );
          const endIndex = data.lastIndexOf(
            isMobile ? "mobile_chapter_navigator" : "navigator_bottom"
          );
          setData(data.substring(startIndex, endIndex));
          setLoading(false);
        })
        .catch(() => {
          setHasError(true);
          setLoading(false);
        });
    });
  }, [url]);

  return { data, loading, hasError };
};
