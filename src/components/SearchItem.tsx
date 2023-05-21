import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import placeholder from "public/images/logo.png";

export const SearchItem: React.FC<{ id: string; name: string }> = ({
  id,
  name,
}) => {
  const [imgSrc, setImgSrc] = useState(
    `https://stals-worker.p0lbang.workers.dev/${id}.jpg`,
  );

  return (
    <Link href={`/accommodation/${id}`}>
      <div className="relative -z-10 ml-3 mt-3 h-64 w-64 rounded-xl border bg-p-gray">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="-z-10 object-contain"
          unoptimized
          onError={() => {
            setImgSrc(placeholder.src);
          }}
        />
        <div className="z-20 text-center">{name}</div>
      </div>
    </Link>
  );
};

export default SearchItem;
