import { useState } from "react";

export const useSearchPanelHooks = (
  searchResults: [number, string][],
  // eslint-disable-next-line no-unused-vars
  handleNavigateSearch: (index: number) => void
) => {
  const [minimize, setMinimize] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const handleMinimize = () => {
    setMinimize(!minimize);
  };
  const [isCopied, setIsCopied] = useState(false);
  const navigateSearchNext = () => {
    if (searchResults.length) {
      setSearchIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        const nextIndex = newIndex < searchResults.length ? newIndex : prevIndex;
        const pageNumber = searchResults[nextIndex][0] + 1;
        handleNavigateSearch(pageNumber);
        return nextIndex;
      });
    }
  };

  const navigateSearchBack = () => {
    if (searchResults.length) {
      setSearchIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        const oldIndex = newIndex >= 0 ? newIndex : prevIndex;
        const pageNumber = searchResults[oldIndex][0] + 1;
        handleNavigateSearch(pageNumber);
        return oldIndex;
      });
    }
  };

  return {
    navigateSearchNext,
    navigateSearchBack,
    handleMinimize,
    isCopied,
    setIsCopied,
    minimize,
    searchIndex,
  };
};
