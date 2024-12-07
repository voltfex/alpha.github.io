import { deleteItems, setFavorite } from '@/redux/slice/cardSlice';
import { RootState, useAppDispatch } from '@/redux/store';
import { Heart, Trash2 } from 'lucide-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

interface Props {
  _id: string;
  text: string;
  title: string;
  createdAt: string;
  imageUrl?: string;
  className?: string;
}

export const Card: React.FC<Props> = ({ _id, text, title, createdAt }) => {
  const { favorites } = useSelector((state: RootState) => state.cards);
  const [isLiked, setIsLiked] = React.useState(Boolean(favorites.find((item) => item._id === _id)));
  const dispatch = useAppDispatch();

  const handleLike = () => {
    setIsLiked(!isLiked);
    dispatch(setFavorite({ _id, text, title, createdAt }));
  };

  React.useEffect(() => {}, [isLiked]);

  return (
    <div className={'flex flex-col w-[600px] gap-3 p-4 shadow-lg rounded-[8px]'}>
      <Link className="flex flex-col" to={`/card/${_id}`}>
        <img
          className="max-w-full h-[300px]"
          src={`https://cataas.com/cat?timestamp=${_id}`}
          alt="cat"
        />
        <div className="flex flex-col gap-2">
          <span className="text-[12px] text-black/50">{createdAt.slice(0, 15)}</span>
          <h3 className="font-semibold">{title}</h3>
          <p>{text.length > 70 ? `${text.slice(0, 70)}...` : text}</p>
        </div>
      </Link>
      <div className="flex gap-3 self-end">
        <Heart
          className="cursor-pointer"
          onClick={() => handleLike()}
          color="#ef4444"
          fill={isLiked ? '#ef4444' : '#fff'}
        />
        <Trash2 className="cursor-pointer" onClick={() => dispatch(deleteItems(_id))} />
      </div>
    </div>
  );
};
