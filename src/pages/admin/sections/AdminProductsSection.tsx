import React, { useState, useMemo, useRef } from 'react';
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  ToggleLeft,
  ToggleRight,
  ImageOff,
} from 'lucide-react';
import type { Product } from '../../../types';

const CATEGORIES = [
  'Festival Special',
  'New Arrivals',
  'On Demand',
  'Books',
  'Puja',
  'Idols & Handicrafts',
  'Dancewear & Jewellery',
  'Home & Gifts',
  'Textiles',
];

const PAGE_SIZE = 10;

function emptyProduct(): Product {
  return {
    id: '',
    name: '',
    subtitle: '',
    category: CATEGORIES[0],
    subcategory: '',
    sku: '',
    price: 0,
    originalPrice: undefined,
    inStock: true,
    stockCount: 0,
    rating: 0,
    reviewCount: 0,
    image: '',
    additionalImages: [],
    description: '',
    material: '',
    dimensions: '',
    weight: '',
    tags: [],
    isNewArrival: false,
    isBestSeller: false,
    isFestivalSpecial: false,
  };
}

interface AdminProductsSectionProps {
  products: Product[];
  onUpdateProduct: (p: Product) => void;
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
}

interface FormState {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  subcategory: string;
  sku: string;
  price: string;
  originalPrice: string;
  stockCount: string;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  tags: string;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFestivalSpecial: boolean;
  image: string;
  inStock: boolean;
}

function productToForm(p: Product): FormState {
  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle ?? '',
    category: p.category,
    subcategory: p.subcategory,
    sku: p.sku,
    price: String(p.price),
    originalPrice: p.originalPrice != null ? String(p.originalPrice) : '',
    stockCount: String(p.stockCount),
    description: p.description,
    material: p.material ?? '',
    dimensions: p.dimensions ?? '',
    weight: p.weight ?? '',
    tags: (p.tags ?? []).join(', '),
    isNewArrival: p.isNewArrival ?? false,
    isBestSeller: p.isBestSeller ?? false,
    isFestivalSpecial: p.isFestivalSpecial ?? false,
    image: p.image,
    inStock: p.inStock,
  };
}

function formToProduct(f: FormState, existing?: Product): Product {
  return {
    ...(existing ?? emptyProduct()),
    id: f.id || crypto.randomUUID(),
    name: f.name,
    subtitle: f.subtitle || undefined,
    category: f.category,
    subcategory: f.subcategory,
    sku: f.sku,
    price: parseFloat(f.price) || 0,
    originalPrice: f.originalPrice ? parseFloat(f.originalPrice) : undefined,
    inStock: f.inStock,
    stockCount: parseInt(f.stockCount) || 0,
    description: f.description,
    material: f.material || undefined,
    dimensions: f.dimensions || undefined,
    weight: f.weight || undefined,
    tags: f.tags ? f.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    isNewArrival: f.isNewArrival,
    isBestSeller: f.isBestSeller,
    isFestivalSpecial: f.isFestivalSpecial,
    image: f.image,
    rating: existing?.rating ?? 0,
    reviewCount: existing?.reviewCount ?? 0,
  };
}

function emptyForm(): FormState {
  return productToForm(emptyProduct());
}

export const AdminProductsSection: React.FC<AdminProductsSectionProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchCat = !categoryFilter || p.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm());
    setPanelOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm(productToForm(p));
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const product = formToProduct(form, editingProduct ?? undefined);
    if (editingProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
    closePanel();
  };

  const handleToggleStock = (p: Product) => {
    onUpdateProduct({ ...p, inStock: !p.inStock });
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      onDeleteProduct(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(f => ({ ...f, [key]: value }));
  };

  return (
    <div className="relative">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, SKU, category…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30 bg-white"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#cca730]/30"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#cca730] text-white rounded-lg text-sm font-medium hover:bg-[#b8921f] transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-gray-400">No products found</td>
                </tr>
              ) : paged.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <ImageOff className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</p>
                    {p.subtitle && <p className="text-xs text-gray-400 truncate max-w-[180px]">{p.subtitle}</p>}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-600 text-xs">{p.sku}</td>
                  <td className="px-4 py-3 text-gray-600">
                    <span>{p.category}</span>
                    {p.subcategory && <span className="text-gray-400"> / {p.subcategory}</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">£{p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{p.stockCount}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        title="Edit"
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#cca730] transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStock(p)}
                        title={p.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {p.inStock ? <ToggleRight className="w-4 h-4 text-green-500" /> : <ToggleLeft className="w-4 h-4 text-gray-400" />}
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        title={deleteConfirm === p.id ? 'Click again to confirm' : 'Delete'}
                        className={`p-1.5 rounded-lg transition-colors ${deleteConfirm === p.id ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-400 hover:text-red-500'}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-gray-700">{page} / {totalPages}</span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-in Form Panel */}
      {panelOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={closePanel} />
          <div
            ref={panelRef}
            className="relative ml-auto w-full max-w-xl bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300"
            style={{ maxHeight: '100dvh' }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#00362f] text-white shrink-0">
              <h2 className="font-semibold text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={closePanel} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Product Name *</label>
                  <input required value={form.name} onChange={e => setField('name', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                  <input value={form.subtitle} onChange={e => setField('subtitle', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
                  <select required value={form.category} onChange={e => setField('category', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#cca730]/30">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subcategory</label>
                  <input value={form.subcategory} onChange={e => setField('subcategory', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">SKU *</label>
                  <input required value={form.sku} onChange={e => setField('sku', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price (£) *</label>
                  <input required type="number" min="0" step="0.01" value={form.price} onChange={e => setField('price', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Original Price (£)</label>
                  <input type="number" min="0" step="0.01" value={form.originalPrice} onChange={e => setField('originalPrice', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Stock Count *</label>
                  <input required type="number" min="0" value={form.stockCount} onChange={e => setField('stockCount', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                  <input type="url" value={form.image} onChange={e => setField('image', e.target.value)} placeholder="https://…" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                  {form.image && <img src={form.image} alt="Preview" className="mt-2 w-16 h-16 rounded-lg object-cover border border-gray-100" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={e => setField('description', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Material</label>
                  <input value={form.material} onChange={e => setField('material', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Dimensions</label>
                  <input value={form.dimensions} onChange={e => setField('dimensions', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Weight</label>
                  <input value={form.weight} onChange={e => setField('weight', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => setField('tags', e.target.value)} placeholder="tag1, tag2, tag3" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#cca730]/30" />
                </div>
              </div>

              {/* Flags */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs font-medium text-gray-600 mb-3">Product Flags</p>
                <div className="flex flex-wrap gap-4">
                  {([
                    ['isNewArrival', 'New Arrival'],
                    ['isBestSeller', 'Best Seller'],
                    ['isFestivalSpecial', 'Festival Special'],
                    ['inStock', 'In Stock'],
                  ] as [keyof FormState, string][]).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[key] as boolean}
                        onChange={e => setField(key, e.target.checked as FormState[typeof key])}
                        className="w-4 h-4 accent-[#cca730] rounded"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </form>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-white">
              <button type="button" onClick={closePanel} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-[#cca730] text-white rounded-lg hover:bg-[#b8921f] transition-colors font-medium"
              >
                {editingProduct ? 'Save Changes' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
