import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";

export default function Primero() {
  // hook que usa el intersection-observer
  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = "" }) => {
      await new Promise((res) => setTimeout(res, 1000));
      const res = await axios.get("/api/post?cursor=" + pageParam);
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  // si el objeto se 've' y hay nuevas paginas para consultar
  // llamar a la siguiente pagina
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // validadores del componente general
  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  return (
    <div className="">
      {data &&
        data.pages.map((page) => {
          return (
            <React.Fragment key={page.nextId ?? "lastPage"}>
              <div className="border-red-400 border-[5px] ">
                {page.posts.map(
                  (post: {
                    id: string;
                    title: string;
                    createdAt: Date;
                    order: number;
                  }) => (
                    <div
                      className="post border-green-400 border-[2px] m-2 p-2 overflow-hidden"
                      key={post.id}
                    >
                      <p>{post.id}</p>
                      <p>{post.title}</p>
                      {/* <p>{post.createdAt.toString()}</p> */}
                      <p className="text-red-500 text-xl flex flex-row justify-center">
                        {post.order}
                      </p>
                      <hr />
                    </div>
                  )
                )}
              </div>
            </React.Fragment>
          );
        })}

      {/* validador de cada fetch */}
      {isFetchingNextPage ? (
        <div className="flex justify-center my-2">
          <BeatLoader size={10} color="white " />
        </div>
      ) : null}

      {/* consulta si ya no hay paginas para pedir */}
      {!hasNextPage && (
        <div className="border-green-400 h-10 w-full">ya no hay pages</div>
      )}

      {/* es la marca vigilada por el intersection observer */}
      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </div>
  );
}
