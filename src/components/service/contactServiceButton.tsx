import React, { useState } from 'react';
import { useGetUserBySubQuery } from '@/redux/api/userApi';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

interface ContactServiceButtonProps {
  serviceAuthor: string;
}

const ContactServiceButton: React.FC<ContactServiceButtonProps> = ({ serviceAuthor }) => {
  const { data: author, isLoading, isError } = useGetUserBySubQuery(serviceAuthor, {
    skip: !serviceAuthor,
  });
  
  const [open, setOpen] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !author?.email) return <p>Error loading author</p>;

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className="w-full sm:w-auto bg-neutral-900 text-white text-sm px-3 py-2 rounded hover:bg-neutral-800 transition-all duration-300"
        >
          Contact
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {author.name}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4">
            <Image src={author.profile_pic} alt={author.name} width={80} height={80} className="rounded-full" />
            <div>
              <p className="text-lg font-semibold">{author.name}</p>
              <p className="text-sm text-gray-600">{author.headline}</p>
              <button 
                onClick={() => window.open(`mailto:${author.email}`)} 
                className="text-blue-500 hover:underline"
              >
                {author.email}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactServiceButton;
