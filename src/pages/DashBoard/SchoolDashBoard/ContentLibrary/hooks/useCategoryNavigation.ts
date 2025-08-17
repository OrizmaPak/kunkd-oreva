// src/pages/DashBoard/SchoolDashBoard/ContentLibrary/hooks/useCategoryNavigation.ts
import { useState, useCallback } from "react";
import { Book } from "@/components/BookCard";
import { Category } from "./useContentLibraryData";

interface UseCategoryNavigationProps {
  allCats: any[];
  categories: Category[];
  subcategories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSubcategories: React.Dispatch<React.SetStateAction<Category[]>>;
  crumb: string[];
  setCrumb: React.Dispatch<React.SetStateAction<string[]>>;
  closeBook: () => void;
}

export const useCategoryNavigation = ({
  allCats,
  categories,
  subcategories,
  setCategories,
  setSubcategories,
  crumb,
  setCrumb,
  closeBook,
}: UseCategoryNavigationProps) => {
  /** Stories navigation state */
  const [showAllStories, setShowAllStories] = useState(false);
  const [storiesActiveSubSlug, setStoriesActiveSubSlug] = useState<string | null>(null);

  /** Languages navigation state */
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [languagesActiveSubSlug, setLanguagesActiveSubSlug] = useState<string | null>(null);

  /** "For You" row expansion */
  const [expandedSimple, setExpandedSimple] = useState(false);

  /** Which main category is selected */
  const [mainSelected, setMainSelected] = useState<string | null>(null);

  /** If a subcategory was requested */
  const [subRequested, setSubRequested] = useState(false);

  /** Toggle "For You" section */
  const toggleForYouRow = useCallback(() => {
    setExpandedSimple((prev) => !prev);
  }, []);

  /** Handle "See All" on main categories */
  const handleMainSeeAll = useCallback((name: string) => {
    setMainSelected(name);
    setCrumb([name]);
    setSubRequested(true);
  }, [setCrumb]);

  /** Handle "See All" for Stories subcategories */
  const handleStoriesSeeAll = useCallback((slug: string) => {
    setShowAllStories(true);
    setStoriesActiveSubSlug(slug);
    setCrumb(["Stories", slug]);
  }, [setCrumb]);

  /** Handle "See All" for Languages subcategories */
  const handleLanguagesSeeAll = useCallback((slug: string) => {
    setShowAllLanguages(true);
    setLanguagesActiveSubSlug(slug);
    setCrumb(["Languages", slug]);
  }, [setCrumb]);

  /** Crumbs before book overview (so navigation resets correctly) */
  const crumbsBeforeBook = crumb.length > 0 ? crumb.slice(0, -1) : [];

  /** Show/hide crumbs based on state */
  const displayCrumbs =
    crumb.length > 0 &&
    !(crumb.length === 1 && ["Stories", "Languages"].includes(crumb[0]));

  /** Handle breadcrumb click (go back) */
  const handleBreadcrumbClick = useCallback(
    (idx: number) => {
      if (idx === crumbsBeforeBook.length - 1) {
        // last crumb → just close book
        closeBook();
      }
      setCrumb(crumb.slice(0, idx + 1));
      setSubcategories([]);
      setCategories(categories); // reset to root categories
    },
    [crumb, crumbsBeforeBook.length, closeBook, categories, setCategories, setSubcategories, setCrumb]
  );

  return {
    // stories
    showAllStories,
    setShowAllStories,
    storiesActiveSubSlug,
    setStoriesActiveSubSlug,

    // languages
    showAllLanguages,
    setShowAllLanguages,
    languagesActiveSubSlug,
    setLanguagesActiveSubSlug,

    // for you row
    expandedSimple,
    toggleForYouRow,

    // main category
    mainSelected,
    setMainSelected,
    subRequested,
    setSubRequested,

    // breadcrumbs
    crumbsBeforeBook,
    displayCrumbs,
    handleMainSeeAll,
    handleStoriesSeeAll,
    handleLanguagesSeeAll,
    handleBreadcrumbClick,
  };
};
