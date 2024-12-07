import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../components/ui';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Link } from 'react-router-dom';

type Inputs = {
  title: string;
  text: string;
};

interface Props {
  className?: string;
}

export const CreateCard: React.FC<Props> = ({ className }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<Inputs>({
    mode: 'onBlur',
  });

  const onSubmit = (data: Inputs) => {
    async function postData() {
      axios.post('https://f773f3009303798d.mokky.dev/cards', {
        createdAt: String(new Date(Date.now())),
        ...data,
      });
    }
    postData();
    reset();
  };

  return (
    <div
      className={cn('fixed inset-0 bg-black/50 flex items-center justify-center z-50', className)}
    >
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create new card</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The title of your card:
            </label>
            <Input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters long',
                },
              })}
            />
            {errors?.title && (
              <p className="text-red-500 text-sm mt-1">{errors?.title?.message || 'Error!'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              The text of your card:
            </label>
            <textarea
              className="w-full max-h-[200px] border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('text', {
                required: 'Text is required',
                minLength: {
                  value: 10,
                  message: 'title must be at least 10 characters long',
                },
              })}
            />
            {errors?.text && (
              <p className="text-red-500 text-sm mt-1">{errors?.text?.message || 'Error!'}</p>
            )}
          </div>

          <div>
            <Input
              type="submit"
              className="w-full bg-red-600 text-white font-medium py-2 rounded-lg hover:bg-red-500 focus:ring-2 focus:bg-red-700 focus:outline-none transition disabled:opacity-50"
              disabled={!isValid}
            />
          </div>
        </form>

        <Link to={'/'} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          ✕
        </Link>
      </div>
    </div>
  );
};
