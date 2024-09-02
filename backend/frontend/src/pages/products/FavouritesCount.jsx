import { useSelector } from "react-redux"

const FavouritesCount = () => {
  const favourites=useSelector(state=>state.favourites);
  const favCount=favourites.length;

  return (
    <div className="absolute left-2 top-8">
      {favCount>0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favCount}
        </span>
      )}
    </div>
  )
}

export default FavouritesCount
