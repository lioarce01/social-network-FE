import type React from "react";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 pr-2">
      {/* Mockup de 2 comentarios */}

      <div className="flex items-start space-x-4 p-3 border-muted animate-pulse">
        {/* Avatar del usuario */}
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200" />
        </div>

        {/* Contenido del comentario */}
        <div className="space-y-2 w-full">
          {/* Nombre y fecha */}
          <div className="w-full">
            <div className="flex justify-between w-full">
              <div className="flex flex-col space-y-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Texto del comentario */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
