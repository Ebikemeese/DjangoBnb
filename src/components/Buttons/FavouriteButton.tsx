import type React from "react"
import apiService from "../../services/apiService"
import { FaRegHeart } from "react-icons/fa"

interface FavouriteButtonProps {
    id: string;
    is_favourite: boolean;
    markFavourite: (is_favourite: Boolean) => void;

}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({
    id,
    is_favourite,
    markFavourite
}) => {

    const toggleFavourite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        const response = await apiService.postWithToken(
            `properties/${id}/toggle_favourite/`, {}
        )

        markFavourite(response.is_favourite);
    }

  return (
    <div
        className={`absolute top-2 right-2 ${is_favourite ? 'text-airbnb' : 'text-white'} hover:text-airbnb`}
        onClick={toggleFavourite}   
    >
        <FaRegHeart />
    </div>
  )
}

export default FavouriteButton