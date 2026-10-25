import { useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { example } from '../data/mockData';

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setCheckedItems((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  };

  const completedCount = checkedItems.length;
  const totalCount = example.items.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <>
      <div className="mb-8">
        <p className="small-label">Preparation workspace</p>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900 mt-2">
          Requirements checklist
        </h1>

        <p className="text-muted mt-3">
          Track the documents and requirements you have prepared for your
          tender submission.
        </p>
      </div>

      <section className="panel p-6 sm:p-8 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="small-label">Sample tender</p>
            <h2 className="text-xl font-bold text-navy-900 mt-1">
              {example.title}
            </h2>
            <p className="text-sm text-muted mt-2">
              Reference: {example.reference}
            </p>
          </div>

          <div className="rounded-xl bg-blue-100 px-4 py-3">
            <p className="text-sm text-navy-800">Items completed</p>
            <p className="text-xl font-bold text-navy-900">
              {completedCount} of {totalCount}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted">Preparation progress</span>
            <span className="font-semibold text-navy-900">{progress}%</span>
          </div>

          <div
            className="w-full h-2 rounded-full bg-canvas overflow-hidden"
            role="progressbar"
            aria-label="Checklist completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-green-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="border-t border-line my-6" />

        <div className="space-y-3">
          {example.items.map((item) => {
            const isChecked = checkedItems.includes(item.id);

            return (
              <label
                key={item.id}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-green-600 bg-green-100'
                    : 'border-line hover:bg-canvas'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                  className="mt-1 h-4 w-4 accent-green-600 shrink-0"
                />

                <span className="flex-1">
                  <span
                    className={`block font-medium ${
                      isChecked
                        ? 'text-green-700 line-through'
                        : 'text-navy-900'
                    }`}
                  >
                    {item.text}
                  </span>

                  <span className="block text-sm text-muted mt-1">
                    Reference: {item.page}
                  </span>
                </span>

                {isChecked && (
                  <CheckCircle2
                    size={20}
                    className="text-green-700 shrink-0"
                  />
                )}
              </label>
            );
          })}
        </div>

        {completedCount === totalCount && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 flex gap-3 items-start">
            <CheckCircle2 className="text-green-700 shrink-0" size={21} />
            <div>
              <p className="font-semibold text-green-700">
                Sample checklist completed!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Remember to verify every requirement against the original
                tender before submitting a bid.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-xl bg-blue-100 p-4 flex gap-3 items-start">
          <Info className="text-blue-700 shrink-0" size={20} />
          <p className="text-sm text-navy-800">
            This is illustrative checklist data. In the integrated version,
            requirements should be generated from the uploaded tender and
            checked against the source document.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-light mt-6"
          onClick={() => setCheckedItems([])}
        >
          Reset checklist
        </button>

        <p className="text-xs text-muted mt-4">
          Your checkbox selections are temporary and will reset if this page
          is refreshed.
        </p>
      </section>
    </>
  );
}