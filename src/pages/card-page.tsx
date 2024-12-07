import { Container } from '@/components/shared';
import { Card } from '@/redux/slice/cardSlice';
import axios from 'axios';
import { MoveLeft } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router';

interface Props {
  className?: string;
}

export const CardPage: React.FC<Props> = ({}) => {
  const [cards, setCards] = React.useState<Card>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchCardById() {
      try {
        const { data } = await axios.get(`https://f773f3009303798d.mokky.dev/cards?_id=${id}`);
        setCards(data[0]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCardById();
  }, []);

  if (!cards) {
    return 'Загрузка...';
  }

  return (
    <div className="flex justify-center">
      <Container>
        <div className="flex items-start mt-[300px] gap-6 p-4 w-[600px] bg-white shadow-md rounded-lg">
          <img
            className="w-24 h-24 rounded-md object-cover"
            src={`https://cataas.com/cat?timestamp=${id}`}
            alt="Random Cat"
          />
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-gray-700">{cards.createdAt}</h2>
            <h4 className="text-base text-gray-500">{cards.text}</h4>
          </div>
        </div>
        <Link to={'/'}>
          <MoveLeft className="mt-4" size={30} color="gray" />
        </Link>
      </Container>
    </div>
  );
};
