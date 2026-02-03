import { format } from "date-fns";
import { cs } from "date-fns/locale";

interface NewsCardProps {
  news: {
    _id: string;
    title: string;
    content: string;
    createdAt: number;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{news.title}</h3>
      <p className="text-gray-600 whitespace-pre-wrap mb-3">{news.content}</p>
      <div className="text-sm text-gray-500">
        {format(new Date(news.createdAt), "d. MMMM yyyy, HH:mm", { locale: cs })}
      </div>
    </div>
  );
}
