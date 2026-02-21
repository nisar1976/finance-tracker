import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-100">
            💰 Finance Tracker
          </Link>
          <div className="flex gap-6">
            <Link
              href="/"
              className="hover:text-blue-100 transition-colors py-2 px-3"
            >
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className="hover:text-blue-100 transition-colors py-2 px-3"
            >
              Transactions
            </Link>
            <Link
              href="/transactions/new"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors"
            >
              + Add Transaction
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
