import { Button } from '../components/Button'
import { useEffect, useState } from 'react';
import { api } from '../services/api'

export type GenreResponseProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type SideBarProps = {
  selectedGenreId: number;
  setSelectedGenreId(id: number): void;
  setSelectedGenre(data: GenreResponseProps): void;
}

export function SideBar({ selectedGenreId, setSelectedGenreId, setSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);


  function handleSetSelectedGenre(id: number){
    setSelectedGenreId(id)
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>
      <div className="buttons-container">
        {genres.map(genre => {
          return (<Button 
            key={genre.id} 
            iconName={genre.name} 
            title={genre.title} 
            selected={genre.id === selectedGenreId}
            onClick={()=> handleSetSelectedGenre(genre.id)} 
          />)
        })}
      </div>
    </nav>
  )
}