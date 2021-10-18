import React from "react";
import {format, parseISO} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type Episode = {
  id: string;
  title: string;
  members: string;
}

type HomeProps = {
  episodes: Episode[];
}

import { GetStaticProps } from 'next';
import { api } from "../services/api";

export default function Home(props: HomeProps) {

  return (
    <h1></h1>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.url,
    };
  })
;
  return {
    props: {
      episodes: data,
    },

    revalidate: 60 * 60 * 8,
  }
}