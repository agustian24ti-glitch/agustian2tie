import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  const [dataForm, setDataForm] = useState({ searchTerm: "", selectedTag: "" });

  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(_searchTerm) || f.description.toLowerCase().includes(_searchTerm);
    const matchesTag = dataForm.selectedTag ? f.tags.includes(dataForm.selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(frameworkData.flatMap((f) => f.tags))];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans text-slate-800">
      {/* Header Simpel */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">Frameworks</h1>
        <p className="text-slate-500">Cari dan filter library JavaScript favoritmu.</p>
      </header>

      {/* Input & Filter - Minimalis */}
      <div className="space-y-6 mb-12">
        <input
          type="text"
          placeholder="Cari framework..."
          value={dataForm.searchTerm}
          onChange={(e) => setDataForm({ ...dataForm, searchTerm: e.target.value })}
          className="w-full p-4 bg-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDataForm({ ...dataForm, selectedTag: "" })}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!dataForm.selectedTag ? "bg-slate-800 text-white" : "bg-slate-100 hover:bg-slate-200"}`}
          >
            Semua
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setDataForm({ ...dataForm, selectedTag: tag })}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${dataForm.selectedTag === tag ? "bg-indigo-600 text-white" : "bg-slate-100 hover:bg-slate-200"}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Framework - Gaya List Bersih */}
      <div className="divide-y divide-slate-100">
        {filteredFrameworks.map((item) => (
          <div key={item.id} className="py-8 group flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">{item.name}</h2>
                <span className="text-xs text-slate-400 font-medium">{item.details.releaseYear}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              <div className="flex gap-2 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-slate-400">#{tag}</span>
                ))}
              </div>
            </div>
            
            <a
              href={item.details.officialWebsite}
              target="_blank"
              className="inline-flex items-center justify-center h-10 px-6 rounded-lg border border-slate-200 text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Visit
            </a>
          </div>
        ))}

        {filteredFrameworks.length === 0 && (
          <p className="py-12 text-center text-slate-400 italic">Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
}