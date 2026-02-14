'use client';
import { IStory, PropsWithClass } from '@/types';
import React, { useEffect } from 'react';
import Container from './Container';
import { cn } from '@/lib/utils';
import { apiClient } from '@/services/api-client';
import Image from 'next/image';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

const Stories = ({ className }:PropsWithClass) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();
  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if(story.items.length > 0) {
      setOpen(true);
    }
  };
  useEffect(() => {
    async function fetchStories() {
      const data = await apiClient.storiesService.getAll();
      setStories(data);
    };
    fetchStories();
  }, []);
  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10 ', className)}>
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse" />
        ))}
         {stories.map((story) => (
          <Image
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt={''} />
        ))}
      </Container>
       {open && selectedStory &&(
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                defaultInterval={3000}
                width={520}
                height={700}
              />
            </div>
          </div>
        )}
    </>
  );
};

export default Stories;