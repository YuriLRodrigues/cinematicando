'use client'
import { Button } from '@nextui-org/react'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'
import { useMovieStore } from '@/store/use-movie-store'
import { Movie } from '@/types/movie'
import { Plus, X } from 'lucide-react'

type AddToMyListButtonProps = ComponentProps<'button'> & {
  movie: Movie
}

export const AddToMyListButton = ({
  className,
  movie,
}: AddToMyListButtonProps) => {
  const { add, remove, verify } = useMovieStore((state) => ({
    add: state.actions.addMovie,
    remove: state.actions.removeMovie,
    verify: state.actions.movieAlreadyExists,
  }))

  const handleAdd = () => {
    add(movie)
  }

  const handleRemove = () => {
    remove(movie.id)
  }

  const isAdded = verify(movie.id)

  return (
    <Button
      radius="lg"
      className={cn(
        'flex w-fit items-center justify-center gap-3 rounded-lg border border-white bg-transparent p-1 text-xs text-white md:p-2 md:text-base',
        className,
      )}
      onClick={isAdded ? handleRemove : handleAdd}
    >
      {isAdded ? `Remover da lista` : `Minha lista`}
      {isAdded ? <X className="text-red-500" /> : <Plus />}
    </Button>
  )
}
