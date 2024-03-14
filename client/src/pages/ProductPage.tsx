import AddProductPage from '../components/AddProductForm'

const ProductPage = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-slate-900 p-4 text-white">
      <div className="w-full space-y-8 p-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Add Products</h2>
        </div>
        <AddProductPage/>
      </div>
    </div>
  )
}

export default ProductPage
