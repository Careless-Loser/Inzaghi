"use client";

interface Props {
  title: string;
  description: string;
}

export default function ProjectItem({ title, description }: Props) {
  return (
    <div className="group w-full flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-[#222] hover:bg-[#111] transition-colors duration-500 cursor-pointer px-4 -mx-4">
      <h3 className="text-5xl md:text-7xl uppercase font-bold tracking-tighter group-hover:-skew-x-6 transition-transform duration-500">
        {title}
      </h3>
      <p className="max-w-xs text-sm mt-4 md:mt-0 text-gray-400 group-hover:text-white transition-colors duration-500">
        {description}
      </p>
    </div>
  );
}