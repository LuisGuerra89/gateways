import { useRouter } from 'next/router';
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();

  return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                  href="/"
                  className={`block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 dark:text-white ${
                      router.pathname === '/' ? 'md:text-blue-500' : ''
                  }`}
                  aria-current={router.pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                  href="/gateway"
                  className={`block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 dark:text-white ${
                      router.pathname === '/gateway' ? 'md:text-blue-500' : ''
                  }`}
                  aria-current={router.pathname === '/gateway' ? 'page' : undefined}
              >
                Gateway
              </Link>
            </li>
            <li>
              <Link
                  href="/device"
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ${
                      router.pathname === '/device' ? 'md:text-blue-500' : ''
                  }`}
                  aria-current={router.pathname === '/device' ? 'page' : undefined}
              >
                Device
              </Link>
            </li>
          </ul>

        </div>
      </nav>
  );
};

export default Navbar;
