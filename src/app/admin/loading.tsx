export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-white/5 rounded-lg"></div>
          <div className="h-4 w-48 bg-white/5 rounded-lg"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass p-5 flex flex-col gap-4 border-white/5">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-white/5 rounded-lg"></div>
                <div className="h-4 w-1/2 bg-white/5 rounded-lg"></div>
                <div className="h-6 w-1/4 bg-white/10 rounded-lg"></div>
              </div>
            </div>
            <div className="h-10 w-full bg-white/5 rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
