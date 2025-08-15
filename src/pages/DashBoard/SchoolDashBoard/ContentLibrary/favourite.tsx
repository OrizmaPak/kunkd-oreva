import React, { useEffect, useState } from "react";
import { GetLikedContent } from "@/api/api";
import BookCard, { Book } from "@/components/BookCard";
import useStore from "@/store";
import { getProfileState } from "@/store/profileStore";
import { Input } from "@mantine/core";

const Favourite: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Stories");
  const [searchTerm, setSearchTerm] = useState("");

  const [profile] = useStore(getProfileState);
  const profileId = profile?.id || sessionStorage.getItem("profileId");

  // Load favourites from API
  useEffect(() => {
    if (!profileId) {
      setError("No profile selected");
      setLoading(false);
      return;
    }

    setLoading(true);
    GetLikedContent(profileId)
      .then((res) => {
        const fetchedBooks = res.data?.data || [];
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load favourites");
      })
      .finally(() => setLoading(false));
  }, [profileId]);

  // Filter by category + search
  useEffect(() => {
    let result = books;

    if (activeCategory !== "All") {
      result = result.filter(
        (b) =>
          b.category?.toLowerCase() === activeCategory.toLowerCase() ||
          b.subCategory?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      result = result.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(result);
  }, [books, activeCategory, searchTerm]);

  if (loading) return <p className="p-4">Loading favourites...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Favourites</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {["Stories", "Languages", "Literacy", "All"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === cat
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
        <div className="ml-auto w-64">
          <Input
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Book grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No favourites found for this category.</p>
      )}
    </div>
  );
};

export default Favourite;
