import { api } from "~/utils/api";
import React, { useEffect } from "react";

export default function Backend() {
  const NUMBEROFITEMS = 10;
  const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    api.accommodation.getInfiniteExample.useInfiniteQuery(
      { limit: NUMBEROFITEMS },
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  useEffect(() => {
    window.addEventListener("scroll", function () {
      // TODO: find a better formula
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        void fetchNextPage();
      }
    });
  }, [fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100lvh+2rem)] flex-col">
      {data?.pages.map((page, i: number) => (
        <div key={i} className="space-y-3">
          {page.items.map((post, j: number) => (
            <div key={j} className="m-2 h-[250px] w-[250px] bg-blue-300">
              <div>item #: {(i * NUMBEROFITEMS + j + 1).toString()}</div>
              <div key={post.id}>Name: {post.name}</div>
            </div>
          ))}
        </div>
      ))}
      {/* debug button just incase the automatic loading is not working */}
      <button
        onClick={() => {
          void fetchNextPage();
        }}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
}
