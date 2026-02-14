import { Card } from "@/components/ui/card";
import { Eye, RotateCcw } from "lucide-react";

interface CollateralCardProps {
  imageUrl?: string;
  name: string;
  value: number;
}

export default function CollateralCard({
  imageUrl,
  name,
  value,
}: CollateralCardProps) {
  const fullImageUrl = imageUrl ? `/storage/${imageUrl}` : undefined;

  return (
    /* Card remains contained with subtle background */
    <Card className="w-full max-w-xs border-none shadow-sm bg-gray-50/80 p-2 rounded-lg group transition-all">

      {/* Image Container - Only top corners are rounded (rounded-t-md) */}
      <div className="relative aspect-square overflow-hidden bg-white rounded-t-md">
        {fullImageUrl ? (
          <img
            src={fullImageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium uppercase">No Image</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="flex-1 bg-white hover:bg-green-300 text-gray-800 py-2.5 px-3 text-[10px] font-bold uppercase tracking-wider shadow-sm transition-colors border border-gray-100">
            Choose options
          </button>
          <button className="bg-white hover:bg-blue-100 text-gray-800 p-2.5 shadow-sm transition-colors flex items-center justify-center border border-gray-100" title="View More">
            <Eye className="w-4 h-4" />
          </button>
          <button className="bg-white hover:bg-green-300 text-gray-800 p-2.5 shadow-sm transition-colors flex items-center justify-center border border-gray-100" title="View More">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content - Flushed against the flat bottom of the image container */}
      <div className="py-4 text-center">
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
          {name}
        </h3>
        <p className="text-[16px] text-green-500 mt-1 font-semibold">
                MWK
                {Number(value).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
                </p>

      </div>
    </Card>
  );
}